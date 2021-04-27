export class UploadConstants {
  public static groupCsvUploadFormat: string = `
    name
    Test_Upload_Group
  `;

  public static groupMappingCsvUploadFormat: string = `
    name,itemIdentifier,itemType
    Test_Upload_Group,Test State Item Identifier,State
  `;

  public static groupJsonUploadFormat: string = `
    [
      {
        "name": "Test_Upload_Group",
        "groupMappings": [
          {
            "itemIdentifier": "Test State Item Identifier",
            "itemType": "State"
          },
          {
            ...
          }
        ]
      }
    ]
  `;
}
