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
    identifier
    Test_Upload_Group
  `;

  public static groupMappingCsvUploadFormat: string = `
    identifier,itemIdentifier,itemType,sortOrder
    Test_Upload_Group,Test State Item Identifier,State,1
  `;

  public static groupJsonUploadFormat: string = `
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
}
