import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as gql from './gql';

import { InformationTypes } from './../models';

@Injectable({
  providedIn: 'root'
})
export class InformationTypesService {
  constructor(
    private apollo: Apollo
  ) {}

  public createInformationTypes(collectionId: number, informationTypes: InformationTypes[]): Observable<InformationTypes[]> {
    return this.apollo
      .mutate<{ createInformationTypes: InformationTypes[] }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_INFORMATION_TYPES,
        variables: {
          collection_id: collectionId,
          informationTypes
        }
      })
      .pipe(map(({ data: { createInformationTypes } }) => createInformationTypes));
  }

  public getInformationTypes(collectionId: number): Observable<InformationTypes[]> {
    return this.apollo
      .query<{ informationTypes: InformationTypes[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_INFORMATION_TYPES,
        variables: {
          collection_id: Number(collectionId)
        }
      })
      .pipe(map(({ data: { informationTypes } }) => informationTypes));
  }
}
