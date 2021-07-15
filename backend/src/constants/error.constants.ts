export class ErrorConstants {
  public static duplicateIdentifierError = (identifier: string): string =>
    `Duplicate identifier ${identifier} provided, please provide a unique identiifer and try again`;

  public static invalidTypesError = (identifier: string, types: Set<string>): string =>
    `Item '${identifier}' has an invalid type, valid types are: ${[ ...types ].toString()}`;

  public static itemNotFoundError = (identifier: string, type: string): string =>
    `An item with the identifier: ${identifier} and type: ${type} could not be found`;
}
