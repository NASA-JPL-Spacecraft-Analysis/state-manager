import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { InformationTypes, InformationTypesMap } from '../models';
import { mockInformationTypes, mockInformationTypesMap } from './../mocks';

@Injectable()
export class MockInformationTypesService {
  public createInformationTypes(collectionId: number, informationTypes: InformationTypes[]): Observable<InformationTypes[]> {
    return new Observable((observer: Observer<InformationTypes[]>) => {
      observer.next(mockInformationTypes);
      observer.complete();
    });
  }

  public getInformationTypes(): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(mockInformationTypesMap);
      observer.complete();
    });
  }
}
