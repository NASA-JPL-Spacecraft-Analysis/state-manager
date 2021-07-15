import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GroupMappingsResponse, GroupResponse, GroupsResponse, Group, GroupUpload, MappingsUpload, Response } from './../models';

import * as gql from './gql/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private apollo: Apollo
  ) {}

  public createGroup(collectionId: string, group: Group): Observable<GroupResponse> {
    return this.apollo
      .mutate<{ createGroup: GroupResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_GROUP,
        variables: {
          collectionId,
          name: group.name,
          groupMappings: group.groupMappings
        }
      })
      .pipe(map(({ data: { createGroup } }) => {
        if (!createGroup.success) {
          throw new Error(createGroup.message);
        }

        return createGroup;
      }));
  }

  public createGroupMappings(collectionId: string, mappingsUpload: MappingsUpload[]): Observable<GroupMappingsResponse> {
    return this.apollo
      .mutate<{ createGroupMappings: GroupMappingsResponse }>({
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

  public createGroups(collectionId: string, groups: GroupUpload[]): Observable<GroupsResponse> {
    return this.apollo
      .mutate<{ createGroups: GroupsResponse }>({
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

  public updateGroup(group: Group, collectionId: string): Observable<GroupResponse> {
    return this.apollo
      .mutate<{ updateGroup: GroupResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_GROUP,
        variables: {
          collectionId: collectionId,
          name: group.name,
          id: group.id,
          groupMappings: group.groupMappings
        }
      })
      .pipe(map(({ data: { updateGroup } }) => {
        if (!updateGroup.success) {
          throw new Error(updateGroup.message);
        }

        return updateGroup;
      }));
  }
}
