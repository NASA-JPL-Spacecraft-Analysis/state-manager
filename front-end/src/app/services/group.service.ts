import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreateGroupMappingsResponse, CreateGroupsResponse, Group, GroupUpload, MappingsUpload, Response } from './../models';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private apollo: Apollo
  ) {}

  public createGroup(collectionId: string, group: Group): Observable<Group> {
    return this.apollo
      .mutate<{ createGroup: Group }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_GROUP,
        variables: {
          collectionId,
          name: group.name,
          groupMappings: group.groupMappings
        }
      })
      .pipe(map(({ data: { createGroup } }) => createGroup));
  }

  public createGroupMappings(collectionId: string, mappingsUpload: MappingsUpload[]): Observable<CreateGroupMappingsResponse> {
    return this.apollo
      .mutate<{ createGroupMappings: CreateGroupMappingsResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_GROUP_MAPPINGS,
        variables: {
          collectionId,
          groupMappings: mappingsUpload
        }
      })
      .pipe(map(({ data: { createGroupMappings } }) => {
        if (!createGroupMappings.success) {
          throw new Error(createGroupMappings.message);
        }

        return createGroupMappings;
      }))
  }

  public createGroups(collectionId: string, groups: GroupUpload[]): Observable<CreateGroupsResponse> {
    return this.apollo
      .mutate<{ createGroups: CreateGroupsResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_GROUPS,
        variables: {
          collectionId,
          groups
        }
      })
      .pipe(map(({ data: { createGroups } }) => {
        if (!createGroups.success) {
          throw new Error(createGroups.message);
        }

        return createGroups;
      }));
  }

  public deleteGroup(id: string): Observable<Response> {
    return this.apollo
      .mutate<{ deleteGroup: Response }>({
        fetchPolicy: 'no-cache',
        mutation: gql.DELETE_GROUP,
        variables: {
          id
        }
      })
      .pipe(map(({ data: { deleteGroup } }) => {
        if (!deleteGroup.success) {
          throw new Error(deleteGroup.message);
        }

        return deleteGroup;
      }));
  }

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

  public updateGroup(group: Group, collectionId: string): Observable<Group> {
    return this.apollo
      .mutate<{ updateGroup: Group }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_GROUP,
        variables: {
          collectionId: collectionId,
          name: group.name,
          id: group.id,
          groupMappings: group.groupMappings
        }
      })
      .pipe(map(({ data: { updateGroup } }) => updateGroup));
  }
}
