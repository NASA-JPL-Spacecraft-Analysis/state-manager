import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InformationTypes, InformationTypesMap } from './../models';
import { addCollectionId, setFormData } from './service-utils';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class InformationTypesService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  public getInformationTypes(collectionId: number): Observable<InformationTypes[]> {
    return this.apollo
      .query<{ informationTypes: InformationTypes[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_INFORMATION_TYPES,
        variables: { collection_id: collectionId }
      })
      .pipe(map(({ data: { informationTypes } }) => informationTypes));
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
