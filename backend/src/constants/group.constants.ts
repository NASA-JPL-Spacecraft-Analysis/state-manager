export class GroupConstants {
  public static duplicateMappingError = (identifier: string, type: string): string => {
    return `Groups can only contain each item once, ${identifier}: ${type} was a duplicate`;
  };

  public static groupNotFoundError = (groupName: string): string => {
    return `A group with the name ${groupName} does not exist, please supply a valid group name and try again`;
  }
}
