import { Injectable } from '@angular/core';
import { csvParse } from 'd3-dsv';
import { InformationTypes, Event, Relationship, State } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  public async parseFile(file: File): Promise<string | any[]> {
    return await this.readFile(file);
  }

  /**
   * Read the incoming file and parse out the values.
   *
   * @param file The file we are parsing.
   */
  private readFile(file: File): Promise<string | any[]> {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        if (file.type === 'application/json') {
          resolve(JSON.parse(fileReader.result.toString()));
        } else if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
          // Windows uses application/vnd.ms-excel for .csv filetypes, so we have to check for that value.
          const parsedItems = csvParse(fileReader.result.toString());
          const items = [];

          for (const item of parsedItems) {
            items.push(item);
          }

          resolve(items);
        }

        resolve(`Filetype: ${file.type} provided, but only JSON and CSV is supported`);
      };

      fileReader.readAsText(file);
    });
  }
}
