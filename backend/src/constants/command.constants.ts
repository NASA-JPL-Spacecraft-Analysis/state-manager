export class CommandConstants {
  public static argumentNotFoundError = (id: string): string =>
    `Command argument with given id: ${id} not found`;

  public static commandArgumentsNotFound = (commandId: string): string =>
    `Command arguments with given command id: ${commandId} not found`;

  public static commandNotFoundIdError = (id: string): string =>
    `Command with given id: ${id} not found`;

  public static commandNotFoundIdentifierError = (identifier: string): string =>
    `Command with given identifier: ${identifier} not found`;
}
