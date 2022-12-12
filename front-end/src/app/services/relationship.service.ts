import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Relationship, RelationshipHistory, RelationshipResponse, RelationshipsResponse, RelationshipUpload } from '../models';

import * as gql from './gql/relationships';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  constructor(
    private apollo: Apollo
  ) { }

  public createRelationship(collectionId: string, relationship: Relationship): Observable<RelationshipResponse> {
    return this.apollo
      .query<{ createRelationship: RelationshipResponse }>({
        fetchPolicy: 'no-cache',
        query: gql.CREATE_RELATIONSHIP,
        variables: {
          collectionId,
          displayName: relationship.displayName,
          subjectToTargetDescription: relationship.subjectToTargetDescription,
          subjectType: relationship.subjectType,
          subjectTypeId: relationship.subjectTypeId,
          targetToSubjectDescription: relationship.targetToSubjectDescription,
          targetType: relationship.targetType,
          targetTypeId: relationship.targetTypeId
        }
      })
      .pipe(map(({ data: { createRelationship } }) => {
        if (!createRelationship.success) {
          throw new Error(createRelationship.message);
        }

        return createRelationship;
      }));
  }

  public createRelationships(collectionId: string, relationships: RelationshipUpload[]): Observable<RelationshipsResponse> {
    return this.apollo
      .query<{ createRelationships: RelationshipsResponse }>({
        fetchPolicy: 'no-cache',
        query: gql.CREATE_RELATIONSHIPS,
        variables: {
          collectionId,
          relationships
        }
      })
      .pipe(map(({ data: { createRelationships } }) => {
        if (!createRelationships.success) {
          throw new Error(createRelationships.message);
        }

        return createRelationships;
      }));
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

  public updateRelationship(relationship: Relationship): Observable<RelationshipResponse> {
    return this.apollo
      .query<{ updateRelationship: RelationshipResponse }>({
        fetchPolicy: 'no-cache',
        query: gql.UPDATE_RELATIONSHIP,
        variables: {
          displayName: relationship.displayName,
          id: relationship.id,
          subjectToTargetDescription: relationship.subjectToTargetDescription,
          subjectType: relationship.subjectType,
          subjectTypeId: relationship.subjectTypeId,
          targetToSubjectDescription: relationship.targetToSubjectDescription,
          targetType: relationship.targetType,
          targetTypeId: relationship.targetTypeId
        }
      })
      .pipe(map(({ data: { updateRelationship } }) => {
        if (!updateRelationship.success) {
          throw new Error(updateRelationship.message);
        }

        return updateRelationship;
      }));
  }
}
