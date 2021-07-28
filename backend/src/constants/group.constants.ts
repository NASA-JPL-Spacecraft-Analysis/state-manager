export class GroupConstants {
  public static duplicateGroupIdentifierError = (identifier: string): string =>
    `A group with given identifier: ${identifier} already exists in this collection`;

  public static duplicateMappingError = (identifier: string, type: string): string =>
    `Groups can only contain each item once, ${identifier}: ${type} was a duplicate`;

  public static groupNotFoundError = (id: string): string =>
    `Group with given id: ${id} not found`;

  public static groupNotFoundIdentifierError = (identifier: string): string =>
    `A group with the identifier: ${identifier} does not exist, please supply a valid group identifier and try again`;
}
