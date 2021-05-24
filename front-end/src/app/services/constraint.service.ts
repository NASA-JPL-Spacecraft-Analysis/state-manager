import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constraint } from './../models';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class ConstraintService {
  constructor(
    private apollo: Apollo
  ) {}

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
