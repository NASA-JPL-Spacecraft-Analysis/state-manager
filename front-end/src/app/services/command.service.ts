import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Command,
  CommandArgument,
  CommandArgumentHistory,
  CommandArgumentResponse,
  CommandArgumentUpload,
  CommandHistory,
  CommandsResponse
} from './../models';

import * as gql from './gql/commands';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  constructor(
    private apollo: Apollo
  ) { }

  public createCommandArguments(collectionId: string, commandArguments: CommandArgumentUpload[]): Observable<CommandArgumentResponse> {
    return this.apollo
      .mutate<{ createCommandArguments: CommandArgumentResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_COMMAND_ARGUMENTS,
        variables: {
          collectionId,
          commandArguments
        }
      })
      .pipe(map(({ data: { createCommandArguments } }) => {
        if (!createCommandArguments.success) {
          throw new Error(createCommandArguments.message);
        }

        return createCommandArguments;
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
      .pipe(map(({ data: { createCommands } }) => {
        if (!createCommands.success) {
          throw new Error(createCommands.message);
        }

        return createCommands;
      }));
  }

  public getCommandArgumentHistory(collectionId: string): Observable<CommandArgumentHistory[]> {
    return this.apollo
      .query<{ commandArgumentHistory: CommandArgumentHistory[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_COMMAND_ARGUMENT_HISTORY,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { commandArgumentHistory } }) => commandArgumentHistory));
  }

  public getCommandArguments(collectionId: string): Observable<CommandArgument[]> {
    return this.apollo
      .query<{ commandArguments: CommandArgument[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_COMMAND_ARGUMENTS,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { commandArguments } }) => commandArguments));
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

  public getCommandTypes(): Observable<string[]> {
    return this.apollo
      .query<{ commandTypes: string[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_COMMAND_TYPES
      })
      .pipe(map(({ data: { commandTypes } }) => commandTypes));
  }
}
