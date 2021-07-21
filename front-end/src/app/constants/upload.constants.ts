export class UploadConstants {
  public static commandCsvUploadFormat: string = `
    description,displayName,externalLink,identifier
    Example description.,Example Command Upload,https://js.jpl.nasa.gov/,EXAMPLE_COMMAND_UPLOAD
  `;

  public static commandJsonUploadFormat: string = `
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

  public static constraintCsvUploadFormat: string = `
    description,displayName,externalLink,identifier,type
    Example description.,Example Constraint Upload,https://js.jpl.nasa.gov/,EXAMPLE_CONSTRAINT_UPLOAD,flight_rule_check,
  `;

  public static constraintJsonUploadFormat: string = `
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

  public static groupCsvUploadFormat: string = `
    name
    Test_Upload_Group
  `;

  public static groupMappingCsvUploadFormat: string = `
    name,itemIdentifier,itemType,sortOrder
    Test_Upload_Group,Test State Item Identifier,State,1
  `;

  public static groupJsonUploadFormat: string = `
    [
      {
        "name": "Test_Upload_Group",
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

  public static stateCsvUploadFormat: string = `
    identifier,displayName,dataType,type,units,source,subsystem,description,externalLink
    STATE_IDENTIFIER_1,State Identifier 1,subsystem,state,test units,test source,identifier 1,https://google.com
  `;

  public static stateEnumerationCsvUploadFormat: string = `
    stateIdentifier,label,value
    upload1,Off,0
    upload1,On,1
  `;

  public static stateEnumerationJsonUploadFormat: string = `
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

  public static stateJsonUploadFormat: string = `
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
