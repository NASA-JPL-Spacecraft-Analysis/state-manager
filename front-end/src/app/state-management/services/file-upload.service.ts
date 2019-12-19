import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { FileUploadServiceInterface } from './file-upload.service.interface';
import { StateManagementConstants } from '../constants/state-management.constants';
import { StateVariable } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService implements FileUploadServiceInterface {
  private readData = new Subject<Array<Partial<StateVariable>>>();

  public parseFile(file: File): Observable<Array<Partial<StateVariable>>> {
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = reader.result.toString();
      const stateVariables: Partial<StateVariable>[] = [];

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

              stateVariables.push(stateVariable);
            }
          }
        }
      }

      this.readData.next(stateVariables);
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
   * If we're looking the first column, remove the starting double quote.
   * If we're looking at the last column, remove the hanging double quote.
   * Otherwise, just trim the data inside the column.
   *
   * @param data The current column's data.
   * @param index The index of our current column.
   * @param length The number of columns we have.
   */
  private trimData(data: string, index: number, length: number): string {
    if (index === 0) {
      // Remove the starting double quote.
      return data.trim().substring(1, data.length);
    } else if (index === length - 1) {
      // Remove the hanging double quote.
      return data.trim().substring(0, data.length - 1);
    } else {
      return data.trim();
    }
  }
}
