import { Injectable } from '@angular/core';
import { csvParse, DSVRowArray } from 'd3-dsv';

import { State, StateEnumerationUpload } from '../models';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  constructor(
    private validationService: ValidationService
  ) {}

  public async parseStates(file: File): Promise<State[]> {
    const parsedItems = await this.readFile(file);

    if (parsedItems && parsedItems.length > 0) {
      const states = [];

      for (const item of parsedItems) {
        // Validate each parsed state, if we come across anything invalid return null so we can error.
        if (this.validationService.validateState(item)) {
          states.push(item);
        } else {
          return null;
        }
      }

      return states;
    }

    return null;
  }

  public async parseStateEnumerations(file: File): Promise<StateEnumerationUpload[]> {
    const parsedItems = await this.readFile(file);

    if (parsedItems && parsedItems.length > 0) {
      const stateEnumerations = [];

      for (const item of parsedItems) {
        if (this.validationService.validateStateEnumerationUpload(item)) {
          stateEnumerations.push(item);
        } else {
          return null;
        }
      }

      return stateEnumerations;
    }

    return null;
  }

  /**
   * Read the incoming file and parse out the values.
   * @param file The file we are parsing.
   */
  private readFile(file: File): Promise<DSVRowArray<string>> {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        resolve(csvParse(fileReader.result.toString()));
      };

      fileReader.readAsText(file);
    });
  }
}
