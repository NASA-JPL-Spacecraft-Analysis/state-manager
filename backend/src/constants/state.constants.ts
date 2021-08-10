export class StateConstants {
  public static enumerationNotFoundError = (id: string): string =>
    `Enumeration with given id: ${id} not found`;

  public static enumerationsNotFoundError = (stateId: string): string =>
    `State with id: ${stateId} not found or has no enumerations`;

  public static stateNotFoundIdError = (id: string): string =>
    `State with given id: ${id} not found`;

  public static stateNotFoundIdentifierError = (identifier: string): string =>
    `State with given identifier: ${identifier} not found`;
}
