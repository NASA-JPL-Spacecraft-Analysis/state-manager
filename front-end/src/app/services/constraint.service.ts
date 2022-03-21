import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constraint, ConstraintResponse, ConstraintsResponse } from './../models';

import * as gql from './gql/constraints';

@Injectable({
  providedIn: 'root'
})
export class ConstraintService {
  constructor(
    private apollo: Apollo
  ) {}

  public createConstraint(constraint: Constraint): Observable<ConstraintResponse> {
    return this.apollo
      .mutate<{ createConstraint: ConstraintResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_CONSTRAINT,
        variables: {
          collectionId: constraint.collectionId,
          description: constraint.description,
          displayName: constraint.displayName,
          editable: constraint.editable,
          externalLink: constraint.externalLink,
          identifier: constraint.identifier,
          type: constraint.type
        }
      })
      .pipe(map(({ data: { createConstraint }}) => {
        if (!createConstraint.success) {
          throw new Error(createConstraint.message);
        }

        return createConstraint;
      }));
  }

  public createConstraints(collectionId: string, constraints: Constraint[]): Observable<ConstraintsResponse> {
    return this.apollo
      .mutate<{ createConstraints: ConstraintsResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_CONSTRAINTS,
        variables: {
          collectionId,
          constraints 
        }
      })
      .pipe(map(({ data: { createConstraints }}) => {
        if (!createConstraints.success) {
          throw new Error(createConstraints.message);
        }

        return createConstraints;
      }));
  }

  public getConstraintHistory(collectionId: string): Observable<Constraint[]> {
    return this.apollo
      .query<{ constraintHistory: Constraint[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_CONSTRAINT_HISTORY,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { constraintHistory } }) => constraintHistory));
  }

  public getConstraints(collectionId: string): Observable<Constraint[]> {
    return this.apollo
      .query<{ constraints: Constraint[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_CONSTRAINTS,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { constraints } }) => constraints));
  }

  public getConstraintTypes(): Observable<string[]> {
    return this.apollo
      .query<{ constraintTypes: string[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_CONSTRAINT_TYPES
      })
      .pipe(map(({ data: { constraintTypes } }) => constraintTypes));
  }

  public updateConstraint(constraint: Constraint): Observable<ConstraintResponse> {
    return this.apollo
      .mutate<{ updateConstraint: ConstraintResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_CONSTRAINT,
        variables: {
          collectionId: constraint.collectionId,
          description: constraint.description,
          displayName: constraint.displayName,
          editable: constraint.editable,
          externalLink: constraint.externalLink,
          id: constraint.id,
          identifier: constraint.identifier,
          type: constraint.type
        }
      })
      .pipe(map(({ data: { updateConstraint }}) => {
        if (!updateConstraint.success) {
          throw new Error(updateConstraint.message);
        }

        return updateConstraint;
      }));
  }
}
