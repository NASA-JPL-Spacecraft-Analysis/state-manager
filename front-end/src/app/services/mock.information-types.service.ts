import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { InformationType, InformationTypeMap } from '../models';
import { mockInformationTypes, mockInformationTypeMap } from './../mocks';

@Injectable()
export class MockInformationTypesService {
  public createInformationType(collectionId: number, informationType: InformationType[]): Observable<InformationType[]> {
    return new Observable((observer: Observer<InformationType[]>) => {
      observer.next(mockInformationTypes);
      observer.complete();
    });
  }

  public getInformationTypes(): Observable<InformationTypeMap> {
    return new Observable((observer: Observer<InformationTypeMap>) => {
      observer.next(mockInformationTypeMap);
      observer.complete();
    });
  }
}
