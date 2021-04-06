import { StringTMap } from './string-t-map';

// TODO: Rename this class.
export class InformationTypes {
  id: string;
  identifier: string;
  displayName: string;
  description: string;
  externalLink: string;
  type: InformationTypeEnum;
}

export type InformationTypesMap = Map<InformationTypeEnum, StringTMap<InformationTypes>>;

// TODO: These classes will eventually move to their own files once they have more properties.
export class Activity extends InformationTypes {}
export class Command extends InformationTypes {}
export class FlightRule extends InformationTypes {}
export class FSWParameter extends InformationTypes {}
export class Model extends InformationTypes {}

export enum InformationTypeEnum {
  Activity,
  Command,
  Event,
  FlightRule,
  FSWParameter,
  Model,
  State
}
