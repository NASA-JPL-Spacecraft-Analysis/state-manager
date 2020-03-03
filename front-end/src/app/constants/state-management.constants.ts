export class StateManagementConstants {
  // The number of properties that a State Variable has.
  public static stateVariableProperties = 7;

  /**
   * TODO: We'll need a better way to store this in the future. We'll need this list
   * to be available to the backend so we can do validation on both sides to make sure
   * the user is passing a correct type.
   */
  public static relationshipTypes: string[] = [
    'Activity',
    'Command',
    'Model',
    'State'
  ];
}
