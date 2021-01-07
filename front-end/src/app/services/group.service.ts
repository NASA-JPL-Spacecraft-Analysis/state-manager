import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Group } from './../models';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private apollo: Apollo
  ) {}

  public getGroupsAndMappings(collectionId: string): Observable<Group[]> {
    return this.apollo
      .query<{ groups: Group[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_GROUPS_AND_MAPPINGS,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { groups } }) => groups));
  }
}