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

  public createRelationship(collectionId: number, relationship: Relationship): Observable<Relationship> {
    return this.apollo
      .query<{ createRelationship: Relationship }>({
        fetchPolicy: 'no-cache',
        query: gql.CREATE_RELATIONSHIP,
        variables: {
          collection_id: collectionId,
          description: relationship.description,
          display_name: relationship.displayName,
          subject_type: relationship.subjectType,
          target_type: relationship.targetType,
          // TODO: Track down where the id is turned into a string at some point so we can remove this conversion.
          subject_type_id: Number(relationship.subjectTypeId),
          target_type_id: Number(relationship.targetTypeId)
        }
      })
    .pipe(map(({ data: { createRelationship } }) => createRelationship));
  }

  public createRelationships(collectionId: number, relationships: RelationshipUpload[]): Observable<Relationship[]> {
    return this.apollo
      .query<{ createRelationships: Relationship[] }>({
        fetchPolicy: 'no-cache',
        query: gql.CREATE_RELATIONSHIPS,
        variables: {
          collection_id: collectionId,
          relationships
        }
      })
    .pipe(map(({ data: { createRelationships } }) => createRelationships));
  }

  public getRelationships(collectionId: number): Observable<Relationship[]> {
    return this.apollo
      .query<{ relationships: Relationship[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_RELATIONSHIPS,
        variables: {
          collection_id: collectionId
        }
      })
      .pipe(map(({ data: { relationships } }) => relationships));
  }

  public getRelationshipHistory(collectionId: number): Observable<RelationshipHistory[]> {
    return this.apollo
      .query<{ relationshipHistory: RelationshipHistory[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_RELATIONSHIP_HISTORY,
        variables: {
          collection_id: collectionId
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
          display_name: relationship.displayName,
          // TODO: Track down where the id is turned into a string at some point so we can remove this conversion.
          id: Number(relationship.id),
          subject_type: relationship.subjectType,
          target_type: relationship.targetType,
          subject_type_id: Number(relationship.subjectTypeId),
          target_type_id: Number(relationship.targetTypeId)
        }
      })
    .pipe(map(({ data: { updateRelationship } }) => updateRelationship));
  }
}
