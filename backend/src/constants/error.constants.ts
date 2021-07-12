export class ErrorConstants {
  public static itemNotFoundError = (identifier: string, type: string): string =>
    `An item with the identifier: ${identifier} and type: ${type} could not be found`;
}
