// TODO: Validate data types for this interface, some of these will become enums.
export interface StateVariable {
  id: number;
  identifier: string;
  source: string; // enum?
  type: string; // enum?
  units: string; // enum?
  descirption: string;
}
