import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as gql from './gql/information-types';

import { InformationType } from './../models';

@Injectable({
  providedIn: 'root'
})
export class InformationTypeService {
  constructor(
    private apollo: Apollo
  ) {}

  public createInformationTypes(collectionId: string, informationTypes: InformationType[]): Observable<InformationType[]> {
    return this.apollo
      .mutate<{ createInformationTypes: InformationType[] }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_INFORMATION_TYPES,
        variables: {
          collectionId,
          informationTypes
        }
      })
      .pipe(map(({ data: { createInformationTypes } }) => createInformationTypes));
  }

  public getInformationTypes(collectionId: string): Observable<InformationType[]> {
    return this.apollo
      .query<{ informationTypes: InformationType[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_INFORMATION_TYPES,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { informationTypes } }) => informationTypes));
  }
}
