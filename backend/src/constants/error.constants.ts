export class ErrorConstants {
  public static duplicateIdentifierError = (identifier: string): string =>
    `Duplicate identifier ${identifier} provided, please provide a unique identiifer and try again`;

  public static itemNotFoundError = (identifier: string, type: string): string =>
    `An item with the identifier: ${identifier} and type: ${type} could not be found`;
}
