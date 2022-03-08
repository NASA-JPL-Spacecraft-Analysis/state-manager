import { Service } from 'typedi';

import { DataType } from '../models';

@Service()
export class DataTypesService {
  private dataTypeMap: Map<string, Set<string>>;

  public async getDataType(type: string): Promise<Set<string>> {
    // If we haven't loaded our data types yet, do that now.
    if (!this.dataTypeMap) {
      await this.loadDataTypes();
    }

    return this.dataTypeMap.get(type) ?? new Set();
  }

  /**
   * Loads and maps the datatypes from the DB.
   * This function should only run once after the app starts, if new data types are
   * added to the DB the backend should be restarted to relfect those changes.
   */
  private async loadDataTypes(): Promise<void> {
    const dataTypes = await DataType.find();
    this.dataTypeMap = new Map<string, Set<string>>();

    for (const dataType of dataTypes) {
      let currentSet = this.dataTypeMap.get(dataType.type);

      if (!currentSet) {
        currentSet = new Set<string>();
      }

      currentSet.add(dataType.name);
      this.dataTypeMap.set(dataType.type, currentSet);
    }

    console.log(this.dataTypeMap);
  }
}
