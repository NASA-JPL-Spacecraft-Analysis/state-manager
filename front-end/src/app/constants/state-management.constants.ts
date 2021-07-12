import { InformationTypeEnum } from '../models';

export class StateManagementConstants {
  // Match the entire string, only allow a-z, A-Z, 0-9, and _.
  public static groupNameRegex: string = '^[a-zA-Z0-9\_]*$';

  /**
   * TODO: We'll need a better way to store this in the future. We'll need this list
   * to be available to the backend so we can do validation on both sides to make sure
   * the user is passing a correct type.
   */
  public static relationshipTypes: string[] = [
    InformationTypeEnum[InformationTypeEnum.Activity],
    InformationTypeEnum[InformationTypeEnum.Command],
    InformationTypeEnum[InformationTypeEnum.Event],
    InformationTypeEnum[InformationTypeEnum.FlightRule],
    InformationTypeEnum[InformationTypeEnum.Model],
    InformationTypeEnum[InformationTypeEnum.State]
  ];

  public static wrongFiletypeUploadMessage = 'Wrong filetype supplied, only csv and json are supported.';
}
