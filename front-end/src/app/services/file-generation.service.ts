import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { FileType } from '../constants/export.constants';

@Injectable({
  providedIn: 'root'
})
export class FileGenerationService<T> {
  public generateFile(items: T[], fileType: FileType, itemName: string): void {
    let data: string;

    if (items && items.length > 0) {
      switch (fileType) {
        case FileType.CSV:
          const header = Object.keys(items[0]).join(',');
          const values = items.map((o) => Object.values(o).join(',')).join('\n');
          data = `${header}\n${values}`;

          saveAs(new Blob([data], { type: 'text/csv;charset=utf-8' }), itemName + '.' + fileType);

          break;
        case FileType.JSON:
          data = JSON.stringify(items);

          saveAs(
            new Blob([data], { type: 'application/json;charset=utf-8' }),
            itemName + '.' + fileType
          );
          break;
        default:
          throw new Error(
            `File type provided is not valid, please provide one of the following:  [${Object.values(
              FileType
            )}]`
          );
      }
    }
  }
}
