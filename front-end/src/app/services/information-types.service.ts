import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InformationTypesMap } from './../models';
import { addCollectionId, setFormData } from './service-utils';

@Injectable({
  providedIn: 'root'
})
export class InformationTypesService {
  constructor(
    private http: HttpClient
  ) {}

  public getInformationTypes(collectionId: number): Observable<InformationTypesMap> {
    return this.http.get<InformationTypesMap>(
      addCollectionId(collectionId) + 'information-types'
    );
  }

  public saveInformationTypesCsv(file: File, collectionId: number): Observable<InformationTypesMap> {
    const formData = setFormData(file);

    return this.http.post<InformationTypesMap>(
      addCollectionId(collectionId) + 'information-types-csv',
      formData
    );
  }

  public saveInformationTypesJson(file: File, collectionId: number): Observable<InformationTypesMap> {
    const formData = setFormData(file);

    return this.http.post<InformationTypesMap>(
      addCollectionId(collectionId) + 'information-types-json',
      formData
    );
  }
}
