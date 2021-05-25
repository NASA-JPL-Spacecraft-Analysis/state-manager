import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constraint, ConstraintResponse } from './../models';

import * as gql from './gql';

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
      }))
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
}
