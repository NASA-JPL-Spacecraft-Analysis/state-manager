export class UploadConstants {
  public static commandArgumentCsvUploadFormat = `
    commandIdentifier,name,sortOrder
    Example Command Upload,Argument 1,,
  `;

  public static commandArgumentJsonUploadFormat = `
    [
      {
        "commandIdentifier": "Example Command Identifier",
        "name": "Argument 1",
        "sortOrder": 1
      },
      {
        ...
      }
    ]
  `;

  public static commandCsvUploadFormat = `
    description,displayName,externalLink,identifier
    Example description.,Example Command Upload,https://js.jpl.nasa.gov/,EXAMPLE_COMMAND_UPLOAD
  `;

  public static commandJsonUploadFormat = `
    [
      {
        "description": "Example description.",
        "displayName": "Example Command Upload",
        "externalLink": "https://js.jpl.nasa.gov/",
        "identifier": "EXAMPLE_COMMAND_UPLOAD"
      },
      {
        ...
      }
    ]
  `;

  public static constraintCsvUploadFormat = `
    description,displayName,externalLink,identifier,type
    Example description.,Example Constraint Upload,https://js.jpl.nasa.gov/,EXAMPLE_CONSTRAINT_UPLOAD,flight_rule_check,
  `;

  public static constraintJsonUploadFormat = `
    [
      {
        "description": "Example description.",
        "displayName": "Example Constraint Upload",
        "externalLink": "https://js.jpl.nasa.gov/",
        "identifier": "EXAMPLE_CONSTRAINT_UPLOAD",
        "type": "flight_rule_check"
      },
      {
        ...
      }
    ]
  `;

  public static eventCsvUploadFormat = `
    description,displayName,externalLink,identifier,type
    Example description.,Example Event Upload,https://js.jpl.nasa.gov/,EXAMPLE_EVENT_UPLOAD,evr,
  `;

  public static eventJsonUploadFormat = `
    [
      {
        "description": "Example description.",
        "displayName": "Example Event Upload",
        "externalLink": "https://js.jpl.nasa.gov/",
        "identifier": "EXAMPLE_EVENT_UPLOAD",
        "type": "evr"
      },
      {
        ...
      }
    ]
  `;

  public static groupCsvUploadFormat = `
    identifier
    Test_Upload_Group
  `;

  public static groupMappingCsvUploadFormat = `
    identifier,itemIdentifier,itemType,sortOrder
    Test_Upload_Group,Test State Item Identifier,State,1
  `;

  public static groupJsonUploadFormat = `
    [
      {
        "identifier": "Test_Upload_Group",
        "groupMappings": [
          {
            "itemIdentifier": "Test State Item Identifier",
            "itemType": "State",
            "sortOrder": 1
          },
          {
            ...
          }
        ]
      }
    ]
  `;

  public static informationTypeCsvUploadFormat = `
    identifier,displayName,type,description,externalLink
    GOAL_UPLOAD_TEST,Goal Upload Test,goal,,
  `;

  public static informationTypeJsonUploadFormat = `
    [
      {
        "identifier": "GOAL_UPLOAD_TEST",
        "displayName": "Goal Upload Test",
        "type": "goal"
      }
    ]
  `;

  public static stateCsvUploadFormat = `
    identifier,displayName,dataType,type,units,source,subsystem,description,externalLink
    STATE_IDENTIFIER_1,State Identifier 1,subsystem,state,test units,test source,identifier 1,https://google.com
  `;

  public static stateEnumerationCsvUploadFormat = `
    stateIdentifier,label,value
    upload1,Off,0
    upload1,On,1
  `;

  public static stateEnumerationJsonUploadFormat = `
    [
      {
        "stateIdentifier": "test_state_identifier",
        "label": "Off",
        "value": "0"
      },
      {
        "stateIdentifier": "test_state_identifier",
        "label": "On",
        "value": "1"
      }
    ]
  `;

  public static stateJsonUploadFormat = `
    [
      {
        "identifier": "STATE_IDENTIFIER_1",
        "displayName": "Test",
        "dataType": "",
        "type": "asd",
        "units": "asd",
        "source": "asd",
        "subsystem": "asd",
        "description": "",
        "externalLink": ""
      },
      {
        ...
      }
    ]
  `;
}
