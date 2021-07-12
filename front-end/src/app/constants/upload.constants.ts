export class UploadConstants {
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
