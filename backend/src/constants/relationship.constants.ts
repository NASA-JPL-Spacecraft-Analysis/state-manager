export class RelationshipConstants {
  public static relationshipNotFoundError = (id: string): string =>
    `Relationship with id: ${id} not found`;

  public static subjectNotFoundError = (identifier: string): string =>
    `Subject with identifier: ${identifier} not found`;

  public static targetNotFoundError = (identifier: string): string =>
    `Target with identifier: ${identifier} not found`;
}
