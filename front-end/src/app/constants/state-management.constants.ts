import { InformationTypeEnum } from '../models';

export class StateManagementConstants {
  /**
   * TODO: We'll need a better way to store this in the future. We'll need this list
   * to be available to the backend so we can do validation on both sides to make sure
   * the user is passing a correct type.
   */
  public static relationshipTypes: string[] = [
    InformationTypeEnum[InformationTypeEnum.Activity],
    InformationTypeEnum[InformationTypeEnum.Command],
    InformationTypeEnum[InformationTypeEnum.FlightRule],
    InformationTypeEnum[InformationTypeEnum.Model],
    InformationTypeEnum[InformationTypeEnum.State]
  ];

  public static wrongFiletypeUploadMessage = 'Wrong filetype supplied, only csv and json are supported.';
}
