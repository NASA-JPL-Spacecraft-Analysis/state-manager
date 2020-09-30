import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Relationship, RelationshipMap, RelationshipHistory } from '../models';
import { addCollectionId, setFormData } from './service-utils';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  public createRelationship(collectionId: number, relationship: Relationship): Observable<Relationship> {
    return this.http.post<Relationship>(
      addCollectionId(collectionId) + 'relationship',
      relationship
    );
  }

  public editRelationship(collectionId: number, relationship: Relationship): Observable<Relationship> {
    return this.http.put<Relationship>(
      addCollectionId(collectionId) + 'relationship',
      relationship
    );
  }

  public getRelationships(collectionId: number): Observable<Relationship[]> {
    return this.apollo
      .query<{ relationships: Relationship[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_RELATIONSHIPS,
        variables: { collection_id: collectionId }
      })
      .pipe(map(({ data: { relationships } }) => relationships));
  }

  public getRelationshipHistory(collectionId: number): Observable<RelationshipHistory[]> {
    return this.apollo
      .query<{ relationshipHistory: RelationshipHistory[] }>({
        fetchPolicy: 'no-cache',
      query: gql.GET_RELATIONSHIP_HISTORY,
        variables: { collection_id: collectionId }
      })
      .pipe(map(({ data: { relationshipHistory } }) => relationshipHistory));
  }

  public saveRelationshipsCsv(collectionId: number, file: File): Observable<RelationshipMap> {
    const formData = setFormData(file);

    return this.http.post<RelationshipMap>(
      addCollectionId(collectionId) + 'relationships-csv',
      formData
    );
  }

  public saveRelationshipsJson(collectionId: number, file: File): Observable<RelationshipMap> {
    const formData = setFormData(file);

    return this.http.post<RelationshipMap>(
      addCollectionId(collectionId) + 'relationships-json',
      formData
    );
  }
}
