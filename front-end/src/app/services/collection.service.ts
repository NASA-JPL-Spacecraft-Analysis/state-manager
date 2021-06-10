import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Collection, CollectionResponse } from './../models';

import * as gql from './gql/collections';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(
    private apollo: Apollo
  ) {}

  public createCollection(name: string): Observable<CollectionResponse> {
    return this.apollo
      .mutate<{ createCollection: CollectionResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_COLLECTION,
        variables: {
          name
        }
      })
      .pipe(map(({ data: { createCollection } }) => {
        if (!createCollection.success) {
          throw new Error(createCollection.message);
        }

        return createCollection;
      }));
  }

  public deleteCollection(id: string): Observable<boolean> {
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

  public updateCollection(id: string, name: string): Observable<CollectionResponse> {
    return this.apollo
      .mutate<{ updateCollection: CollectionResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_COLLECTION,
        variables: {
          id,
          name
        }
      })
      .pipe(map(({ data: { updateCollection } }) => {
        if (!updateCollection.success) {
          throw new Error(updateCollection.message);
        }

        return updateCollection;
      }));
  }
}
