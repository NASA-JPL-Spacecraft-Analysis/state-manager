// TODO: Validate data types for this interface, some of these will become enums.
export interface StateVariable {
  id: number;
  identifier: string;
  name: string;
  type: string; // enum?
  units: string; // enum?
  source: string; // enum?
  descirption: string;
}
