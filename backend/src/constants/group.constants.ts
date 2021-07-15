export class GroupConstants {
  public static duplicateGroupNameError = (name: string): string =>
    `A group with given name: ${name} already exists in this collection`;

  public static duplicateMappingError = (identifier: string, type: string): string =>
    `Groups can only contain each item once, ${identifier}: ${type} was a duplicate`;

  public static groupNotFoundError = (id: string): string =>
    `Group with given id: ${id} not found`;

  public static groupNotFoundNameError = (groupName: string): string =>
    `A group with the name ${groupName} does not exist, please supply a valid group name and try again`;
}
