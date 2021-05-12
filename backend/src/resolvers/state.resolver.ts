import { Resolver, Query, Arg, Mutation, ResolverInterface , FieldResolver, Root, Args } from 'type-graphql';
import { getConnection } from 'typeorm';
import { UserInputError } from 'apollo-server';

import { State, StateEnumeration, StateHistory, stateTypes } from './../models';
import { CreateStateInput, DeleteEnumerationsInput, SaveEnumerationsInput, UpdateStateInput } from '../inputs';
import { ValidationService } from '../service';
import { CreateStatesInput } from '../inputs/state/create-states.input';
import { EnumerationsResponse, Response, StateResponse, StatesResponse } from '../responses';
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
      for (const state of data.states) {
        this.validationService.isDuplicateIdentifier(await this.states({ collectionId: data.collectionId }), state.identifier);

        state.collectionId = data.collectionId;
      }

      const states = State.create(data.states);

      this.validationService.hasValidType(states, stateTypes);

      for (const state of states) {
        await state.save();

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

  @Mutation(() => Response)
  public async deleteEnumerations(@Arg('data') data: DeleteEnumerationsInput): Promise<Response> {
    try {
      const enumerations = await StateEnumeration.find({
        where: {
          stateId: data.stateId
        }
      });

      if (!enumerations || enumerations.length === 0) {
        throw new UserInputError(StateConstants.enumerationsNotFoundError(data.stateId));
      }

      // Loop over the ids that we're trying to delete, find and delete the associated enumeration.
      for (const id of data.enumerationIds) {
        const enumeration = enumerations.find((e) => e.id === id);

        if (!enumeration) {
          throw new UserInputError(StateConstants.enumerationNotFoundError(id));
        }

        await enumeration.remove();
      }

      return {
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

  @FieldResolver()
  public async enumerations(@Root() state: State): Promise<StateEnumeration[]> {
    return StateEnumeration.find({
      where: {
        stateId: state.id
      }
    });
  }

  @Mutation(() => EnumerationsResponse)
  public async saveEnumerations(@Arg('data') data: SaveEnumerationsInput): Promise<EnumerationsResponse> {
    try {
      const savedEnumerations: StateEnumeration[] = [];
      let currentEnumeration: StateEnumeration | undefined;

      for (const enumeration of data.enumerations) {
        enumeration.collectionId = data.collectionId;

        if (enumeration.id) {
          // If we have already saved this enumeration, update it.
          currentEnumeration = await StateEnumeration.findOne({
            where: {
              id: enumeration.id
            }
          });

          if (currentEnumeration) {
            Object.assign(currentEnumeration, enumeration);

            savedEnumerations.push(await currentEnumeration.save());
          }
        } else {
          if (!enumeration.stateId) {
            const state = await State.findOne({
              where: {
                collectionId: enumeration.collectionId,
                identifier: enumeration.stateIdentifier
              }
            });

            if (state) {
              enumeration.stateId = state.id;
            }
          }

          // Otherwise create a new enumeration.
          savedEnumerations.push(await StateEnumeration.create(enumeration).save());
        }
      }

      return {
        enumerations: savedEnumerations,
        message: 'Enumerations Saved',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Query(() => State)
  public async state(@Args() { collectionId, id, identifier }: IdentifierArgs): Promise<State | undefined> {
    return this.sharedRepository.getOne(collectionId, id, identifier);
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
    const stateHistory = StateHistory.create(state);
    stateHistory.stateId = state.id;
    stateHistory.updated = new Date();

    void stateHistory.save();
  }
}
