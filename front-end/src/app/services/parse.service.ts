import { Injectable } from '@angular/core';
import { csvParse } from 'd3-dsv';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  public async parseFile(file: File): Promise<any[]> {
    return await this.readFile(file);
  }

  /**
   * Read the incoming file and parse out the values.
   * @param file The file we are parsing.
   */
  private readFile(file: File): Promise<any[]> {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        if (file.type === 'application/json') {
          resolve(JSON.parse(fileReader.result.toString()));
        } else if (file.type === 'text/csv') {
          const parsedItems = csvParse(fileReader.result.toString());
          const items = [];

          for (const item of parsedItems) {
            items.push(item);
          }

          resolve(items);
        }

        resolve(null);
      };

      fileReader.readAsText(file);
    });
  }
}
