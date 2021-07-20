import { Resolver, Query, Arg, Mutation, ResolverInterface , FieldResolver, Root, Args } from 'type-graphql';
import { getConnection } from 'typeorm';
import { UserInputError } from 'apollo-server';

import { State, StateEnumeration, StateHistory, stateTypes } from './../models';
import { CreateStateInput, DeleteEnumerationsInput, ModifyStateEnumeration, UpdateStateInput } from '../inputs';
import { ValidationService } from '../service';
import { CreateStatesInput } from '../inputs/state/create-states.input';
import { DeleteEnumerationsResponse, Response, StateResponse, StatesResponse } from '../responses';
import { CollectionIdArgs, IdentifierArgs } from '../args';
import { SharedRepository } from '../repositories';
import { StateConstants } from '../constants';

@Resolver(() => State)
export class StateResolver implements ResolverInterface<State> {
  private sharedRepository: SharedRepository<State>;

  constructor(
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<State>(getConnection(), State);
  }

  @Mutation(() => StateResponse)
  public async createState(@Arg('data') data: CreateStateInput): Promise<StateResponse> {
    try {
      this.validationService.isDuplicateIdentifier(await this.states({ collectionId: data.collectionId }), data.identifier);

      const state = State.create(data);

      this.validationService.hasValidType([ state ], stateTypes);

      await state.save();

      this.createStateHistory(state);

      state.enumerations = await this.saveStateEnumerations(data.enumerations, state.id);

      return {
        message: 'State Created',
        state,
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => StatesResponse)
  public async createStates(@Arg('data') data: CreateStatesInput): Promise<StatesResponse> {
    try {
      const existingStates = await this.states({ collectionId: data.collectionId });
      const stateEnumerationMap = new Map<string, ModifyStateEnumeration[] | undefined>();

      for (const state of data.states) {
        this.validationService.isDuplicateIdentifier(existingStates, state.identifier);

        stateEnumerationMap.set(state.identifier, state.enumerations);

        state.collectionId = data.collectionId;
      }

      const states = State.create(data.states);

      this.validationService.hasValidType(states, stateTypes);

      for (const state of states) {
        await state.save();

        state.enumerations = await this.saveStateEnumerations(stateEnumerationMap.get(state.identifier), state.id);

        this.createStateHistory(state);
      }

      return {
        message: 'States Created',
        states,
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => DeleteEnumerationsResponse)
  public async deleteEnumerations(@Arg('data') data: DeleteEnumerationsInput): Promise<DeleteEnumerationsResponse> {
    try {
      const enumerations = await StateEnumeration.find({
        where: {
          stateId: data.stateId
        }
      });

      if (!enumerations || enumerations.length === 0) {
        throw new UserInputError(StateConstants.enumerationsNotFoundError(data.stateId));
      }

      const deletedIds: string[] = [];

      // Loop over the ids that we're trying to delete, find and delete the associated enumeration.
      for (const id of data.enumerationIds) {
        const enumeration = enumerations.find((e) => e.id === id);

        if (!enumeration) {
          throw new UserInputError(StateConstants.enumerationNotFoundError(id));
        }

        deletedIds.push(enumeration.id);

        await enumeration.remove();
      }

      return {
        deletedEnumerationIds: deletedIds,
        message: 'State Enumeration Deleted',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @FieldResolver(() => [ StateEnumeration ])
  public async enumerations(@Root() state: State): Promise<StateEnumeration[]> {
    return StateEnumeration.find({
      where: {
        stateId: state.id
      }
    });
  }

  @Query(() => State)
  public async state(@Args() { collectionId, id, identifier }: IdentifierArgs): Promise<State | undefined> {
    return this.sharedRepository.getOne(collectionId, id, identifier);
  }

  @Query(() => [ StateEnumeration ])
  public stateEnumerations(@Arg('stateId') stateId: string): Promise<StateEnumeration[]> {
    return StateEnumeration.find({
      where: {
        stateId
      }
    });
  }

  @Query(() => [ StateHistory ])
  public stateHistory(@Args() { collectionId }: CollectionIdArgs): Promise<StateHistory[]> {
    return StateHistory.find({
      where: {
        collectionId
      }
    });
  }

  @Query(() => [ State ])
  public states(@Args() { collectionId }: CollectionIdArgs): Promise<State[]> {
    return State.find({
      where: {
        collectionId
      }
    });
  }

  @Mutation(() => StateResponse)
  public async updateState(@Arg('data') data: UpdateStateInput): Promise<StateResponse> {
    try {
      const state = await this.state({ id: data.id });

      if (!state) {
        throw new UserInputError(StateConstants.stateNotFoundError(data.id));
      }

      this.validationService.isDuplicateIdentifier(await this.states({ collectionId: state.collectionId }), data.identifier, state.id);

      Object.assign(state, data);

      this.validationService.hasValidType([ state ], stateTypes);

      await state.save();

      this.createStateHistory(state);

      state.enumerations = await this.saveStateEnumerations(data.enumerations, state.id);

      return {
        message: 'State Updated',
        state,
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  private createStateHistory(state: State): void {
    const stateHistory = StateHistory.create({
      collectionId: state.collectionId,
      dataType: state.dataType,
      description: state.description,
      displayName: state.displayName,
      editable: state.editable,
      externalLink: state.externalLink,
      identifier: state.identifier,
      source: state.source,
      stateId: state.id,
      subsystem: state.subsystem,
      type: state.type,
      units: state.units,
      updated: new Date()
    });

    void stateHistory.save();
  }

  private async saveStateEnumerations(
    stateEnumerations: ModifyStateEnumeration[] | undefined, stateId: string): Promise<StateEnumeration[]> {
    if (stateEnumerations) {
      for (const enumeration of stateEnumerations) {
        const stateEnumeration = StateEnumeration.create(enumeration);
        stateEnumeration.stateId = stateId;

        await stateEnumeration.save();
      }
    }

    return this.stateEnumerations(stateId);
  }
}
