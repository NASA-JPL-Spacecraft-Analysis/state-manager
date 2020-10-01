import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Collection } from './../models';
import { addCollectionId } from './service-utils';
import { environment } from 'src/environments/environment';

import * as gql from './gql';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  public createCollection(name: string): Observable<Collection> {
    return this.http.post<Collection>(
      baseUrl + '/collection',
      name
    );
  }

  public deleteCollection(collectionId: number): Observable<number> {
    return this.http.delete<number>(
      addCollectionId(collectionId)
    );
  }

  public editCollection(collectionId: number, name: string): Observable<Collection> {
    return this.http.put<Collection>(
      addCollectionId(collectionId),
      name
    );
  }

  public getCollections(): Observable<Collection[]> {
    return this.apollo
      .query<{ collections: Collection[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_COLLECTIONS
      })
      .pipe(map(({ data: { collections } }) => collections));
  }
}
