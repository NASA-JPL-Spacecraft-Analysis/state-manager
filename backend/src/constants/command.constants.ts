export class CommandConstants {
  public static commandNotFoundError = (id: string): string =>
    `Command with given id: ${id} not found`;
}
