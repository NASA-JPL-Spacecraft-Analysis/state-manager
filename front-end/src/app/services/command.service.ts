import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Command, CommandHistory, CommandResponse, CommandsResponse, DeleteArgumentResponse } from './../models';

import * as gql from './gql/commands';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  constructor(
    private apollo: Apollo
  ) {}

  public createCommand(command: Command): Observable<CommandResponse> {
    return this.apollo
      .mutate<{ createCommand: CommandResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_COMMAND,
        variables: {
          arguments: command.arguments,
          collectionId: command.collectionId,
          description: command.description,
          displayName: command.displayName,
          editable: command.editable,
          externalLink: command.externalLink,
          identifier: command.identifier,
          type: command.type
        }
      })
      .pipe(map(({ data: { createCommand }}) => {
        if (!createCommand.success) {
          throw new Error(createCommand.message);
        }

        return createCommand;
      }));
  }

  public createCommands(collectionId: string, commands: Command[]): Observable<CommandsResponse> {
    return this.apollo
      .mutate<{ createCommands: CommandsResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_COMMANDS,
        variables: {
          collectionId,
          commands
        }
      })
      .pipe(map(({ data: { createCommands }}) => {
        if (!createCommands.success) {
          throw new Error(createCommands.message);
        }

        return createCommands;
      }));
  }
  
  public deleteArguments(commandId: string, deletedArgumentIds: string[]): Observable<DeleteArgumentResponse> {
    return this.apollo
      .mutate<{ deleteArguments: DeleteArgumentResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.DELETE_ARGUMENTS,
        variables: {
          commandId,
          deletedArgumentIds
        }
      })
      .pipe(map(({ data: { deleteArguments }}) => {
        if (!deleteArguments.success) {
          throw new Error(deleteArguments.message);
        }

        return deleteArguments;
      }));
  }
  public getCommandHistory(collectionId: string): Observable<CommandHistory[]> {
    return this.apollo
      .query<{ commandHistory: CommandHistory[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_COMMAND_HISTORY,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { commandHistory } }) => commandHistory));
  }

  public getCommands(collectionId: string): Observable<Command[]> {
    return this.apollo
      .query<{ commands: Command[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_COMMANDS,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { commands } }) => commands));
  }

  public updateCommand(command: Command): Observable<CommandResponse> {
    return this.apollo
      .mutate<{ updateCommand: CommandResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_COMMAND,
        variables: {
          arguments: command.arguments,
          collectionId: command.collectionId,
          description: command.description,
          displayName: command.displayName,
          editable: command.editable,
          externalLink: command.externalLink,
          id: command.id,
          identifier: command.identifier,
          type: command.type
        }
      })
      .pipe(map(({ data: { updateCommand }}) => {
        if (!updateCommand.success) {
          throw new Error(updateCommand.message);
        }

        return updateCommand;
      }));
  }
}
