import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Collection } from './../models';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(
    private apollo: Apollo
  ) {}

  public createCollection(name: string): Observable<Collection> {
    return this.apollo
      .mutate<{ createCollection: Collection }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_COLLECTION,
        variables: {
          name
        }
      })
      .pipe(map(({ data: { createCollection } }) => createCollection));
  }

  public deleteCollection(id: number): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteCollection: boolean }>({
        fetchPolicy: 'no-cache',
        mutation: gql.DELETE_COLLECTION,
        variables: {
          id
        }
      })
      .pipe(map(({ data: { deleteCollection } }) => deleteCollection));
  }

  public getCollections(): Observable<Collection[]> {
    return this.apollo
      .query<{ collections: Collection[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_COLLECTIONS
      })
      .pipe(map(({ data: { collections } }) => collections));
  }

  public updateCollection(id: number, name: string): Observable<Collection> {
    return this.apollo
      .mutate<{ updateCollection: Collection }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_COLLECTION,
        variables: {
          id,
          name
        }
      })
      .pipe(map(({ data: { updateCollection } }) => updateCollection));
  }
}
