export class UploadConstants {
  public static commandCsvUploadFormat: string = `
    description,displayName,externalLink,identifier,type
    Example description.,Example Command Upload,https://js.jpl.nasa.gov/,EXAMPLE_COMMAND_UPLOAD,command,
  `;

  public static commandJsonUploadFormat: string = `
    [
      {
        "description": "Example description.",
        "displayName": "Example Command Upload",
        "externalLink": "https://js.jpl.nasa.gov/",
        "identifier": "EXAMPLE_COMMAND_UPLOAD",
        "type": "command"
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
}
