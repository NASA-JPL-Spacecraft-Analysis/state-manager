import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Relationship, RelationshipHistory, RelationshipUpload } from '../models';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  constructor(
    private apollo: Apollo
  ) {}

  public createRelationship(collectionId: string, relationship: Relationship): Observable<Relationship> {
    return this.apollo
      .query<{ createRelationship: Relationship }>({
        fetchPolicy: 'no-cache',
        query: gql.CREATE_RELATIONSHIP,
        variables: {
          collectionId,
          description: relationship.description,
          displayName: relationship.displayName,
          subjectType: relationship.subjectType,
          targetType: relationship.targetType,
          subjectTypeId: relationship.subjectTypeId,
          targetTypeId: relationship.targetTypeId
        }
      })
    .pipe(map(({ data: { createRelationship } }) => createRelationship));
  }

  public createRelationships(collectionId: string, relationships: RelationshipUpload[]): Observable<Relationship[]> {
    return this.apollo
      .query<{ createRelationships: Relationship[] }>({
        fetchPolicy: 'no-cache',
        query: gql.CREATE_RELATIONSHIPS,
        variables: {
          collectionId,
          relationships
        }
      })
    .pipe(map(({ data: { createRelationships } }) => createRelationships));
  }

  public getRelationships(collectionId: string): Observable<Relationship[]> {
    return this.apollo
      .query<{ relationships: Relationship[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_RELATIONSHIPS,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { relationships } }) => relationships));
  }

  public getRelationshipHistory(collectionId: string): Observable<RelationshipHistory[]> {
    return this.apollo
      .query<{ relationshipHistory: RelationshipHistory[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_RELATIONSHIP_HISTORY,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { relationshipHistory } }) => relationshipHistory));
  }

  public updateRelationship(relationship: Relationship): Observable<Relationship> {
    return this.apollo
      .query<{ updateRelationship: Relationship }>({
        fetchPolicy: 'no-cache',
        query: gql.UPDATE_RELATIONSHIP,
        variables: {
          description: relationship.description,
          displayName: relationship.displayName,
          id: relationship.id,
          subjectType: relationship.subjectType,
          targetType: relationship.targetType,
          subjectTypeId: relationship.subjectTypeId,
          targetTypeId: relationship.targetTypeId
        }
      })
    .pipe(map(({ data: { updateRelationship } }) => updateRelationship));
  }
}
