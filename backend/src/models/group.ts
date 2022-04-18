import { createUnionType, Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Command } from './command';
import { Constraint } from './constraint';
import { Event } from './event';
import { GroupMapping } from './group-mapping';
import { InformationType } from './information-type';
import { Node } from './node';
import { State } from './state';

@Entity('groups')
@ObjectType()
export class Group extends Node {
  @Column()
  @Field(() => ID)
  public collectionId!: string;

  @Column()
  @Field()
  public enabled!: boolean;

  @Column()
  @Field()
  public identifier!: string;

  @Field(() => [GroupMapping])
  public groupMappings: GroupMapping[];
}

export type GroupType =
  Command |
  Constraint |
  Event |
  Group |
  InformationType |
  State;

export const GroupMappingUnion = createUnionType({
  name: 'GroupMappingUnion',
  types: () => [Command, Constraint, Event, Group, InformationType, State] as const,
  resolveType: value => {
    if (value instanceof Command) {
      return Command;
    }

    if (value instanceof Constraint) {
      return Constraint;
    }

    if (value instanceof Event) {
      return Event;
    }

    if (value instanceof Group) {
      return Group;
    }

    if (value instanceof InformationType) {
      return InformationType;
    }

    if (value instanceof State) {
      return State;
    }

    return undefined;
  }
});
