import { registerEnumType } from 'type-graphql';

export enum InformationTypeEnum {
  Activity,
  Command,
  FlightRule,
  FSWParameter,
  Model,
  Event,
  State
}

registerEnumType(InformationTypeEnum, {
  name: 'InformationTypeEnum'
});
