import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';

import { FileUploadServiceInterface } from './file-upload.service.interface';
import { StateManagementConstants } from '../constants/state-management.constants';
import { StateVariable } from '../models';
import { StateVariableActions } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService implements FileUploadServiceInterface {
  private readData = new Subject<Action>();

  public parseFile(file: File): Observable<Action> {
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = reader.result.toString();
      const parsedStateVariables: Partial<StateVariable>[] = [];

      // Try and parse our .csv if there's some data.
      if (fileData.length > 0) {
        let stateVariable: Partial<StateVariable>;

        // Split our data by newline.
        const splitFileData = fileData.split('\n');
        let headers: Map<number, string>;

        for (const line of splitFileData) {
          // Split at each ",".
          const splitColumns = line.split('\",\"');
          stateVariable = {};

          // If we are on our first line, then we have our headers.
          if (splitFileData.indexOf(line) === 0) {
            headers = this.getCsvHeaders(splitColumns);
          } else {
            // Only try and parse our dataset if it's the length we're expecting.
            if (splitColumns.length === StateManagementConstants.stateVariableProperties - 1) {
              for (let i = 0; i < splitColumns.length; i++) {
                const trimmedData = this.trimData(splitColumns[i], i, splitColumns.length);

                stateVariable[headers[i]] = trimmedData;
              }

              parsedStateVariables.push(stateVariable);
            } else if (splitColumns.length !== 1) {
              // Skip the error if we're looking at an empty newline at the end of the file.
              this.readData.next(
                StateVariableActions.parseStateVariablesFileFailure({
                  error: new Error('Parse failed. Could not interpret csv headers.')
                })
              );

              return;
            }
          }
        }

        this.readData.next(
          StateVariableActions.parseStateVariablesFileSuccess({
            parsedStateVariables
          })
        );
      }

      this.readData.complete();
    };

    reader.readAsText(file);

    return this.readData.asObservable();
  }

  private getCsvHeaders(splitColumns: string[]): Map<number, string> {
    const headers = new Map<number, string>();

    // Subtract 1 to account for us not including the id.
    if (splitColumns.length === StateManagementConstants.stateVariableProperties - 1) {
      for (let i = 0; i < splitColumns.length; i++) {
        headers[i] = this.trimData(splitColumns[i], i, splitColumns.length);
      }
    }

    return headers;
  }

  /**
   * Trims our data based on the passed parameters.
   * If we're looking the first column, remove the starting double quote if it's there.
   * If we're looking at the last column, remove the hanging double quote if it's there.
   * Otherwise, just trim the data inside the column.
   *
   * @param data The current column's data.
   * @param index The index of our current column.
   * @param length The number of columns we have.
   */
  private trimData(data: string, index: number, length: number): string {
    // Remove any hanging characters first.
    data = data.trim();

    if (index === 0
      && data.length > 0
      && data.charAt(0) === '\"') {
      // Remove the starting double quote.
      return data.substring(1, data.length);
    } else if (index === length - 1
      && data.length > 0
      && data.charAt(data.length - 1) === '\"') {
      // Remove the hanging double quote.
      return data.substring(0, data.length - 1);
    } else {
      return data;
    }
  }
}
