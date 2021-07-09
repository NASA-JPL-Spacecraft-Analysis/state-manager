export class StateManagementConstants {
  // Match the entire string, only allow a-z, A-Z, 0-9, and _.
  public static groupIdentifierRegex: string = '^[a-zA-Z0-9\_]*$';

  public static wrongFiletypeUploadMessage = 'Wrong filetype supplied, only csv and json are supported.';
}
