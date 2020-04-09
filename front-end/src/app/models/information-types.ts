import { StringTMap } from './string-t-map';

// TODO: Rename this class.
class InformationTypes {
  identifier: string;
  displayName: string;
  description: string;
  externalLink: string;
}

export type InformationTypesMap = Map<number, StringTMap<InformationTypes>>;

// TODO: These classes will eventually move to their own files once they have more properties.
export class Activity extends InformationTypes {}
export class Command extends InformationTypes {}
export class Model extends InformationTypes {}
export class FlightRule extends InformationTypes {}

export enum InformationTypeEnum {
  Activity,
  Command,
  Model,
  FlightRule
}
