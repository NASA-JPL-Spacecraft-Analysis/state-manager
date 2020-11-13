import { Injectable } from '@angular/core';

@Injectable()
export class MockParseService {
  public async parseFile(file: File): Promise<any[]> {
    return [];
  }
}
