import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { InformationTypesMap } from '../models';
import { mockInformationTypesMap } from './../mocks';

@Injectable()
export class mockInformationTypesService {
  public getInformationTypes(): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(mockInformationTypesMap);
      observer.complete();
    });
  }

  public saveInformationTypesCsv(file: File): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(mockInformationTypesMap);
      observer.complete();
    });
  }

  public saveInformationTypesJson(file: File): Observable<InformationTypesMap> {
    return new Observable((observer: Observer<InformationTypesMap>) => {
      observer.next(mockInformationTypesMap);
      observer.complete();
    });
  }
}
