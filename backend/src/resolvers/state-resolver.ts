import { Resolver, Query, Arg, Mutation, ResolverInterface , FieldResolver, Root, Args } from 'type-graphql';
import { UserInputError } from 'apollo-server';

import { Response, State, StateEnumeration, StateHistory } from './../models';
import { CreateStateInput, DeleteEnumerationsInput, SaveEnumerationsInput, UpdateStateInput } from '../inputs';
import { ValidationService } from '../service';
import { CreateStatesInput } from '../inputs/state/create-states.input';
import { CollectionIdArgs, IdArgs } from '../args';

@Resolver(() => State)
export class StateResolver implements ResolverInterface<State> {
  constructor(
    private readonly validationService: ValidationService
  ) {}

  @Mutation(() => State)
  public async createState(@Arg('data') data: CreateStateInput): Promise<State> {
    this.validationService.isDuplicateIdentifier(await this.states({ collectionId: data.collectionId }), data.identifier);

    const state = State.create(data);
    state.collectionId = data.collectionId;
    await state.save();

    this.createStateHistory(state);

    return state;
  }

  @Mutation(() => [ State ])
  public async createStates(@Arg('data') data: CreateStatesInput): Promise<State[]> {
    for (const state of data.states) {
      this.validationService.isDuplicateIdentifier(await this.states({ collectionId: data.collectionId }), state.identifier);

      state.collectionId = data.collectionId;
    }

    const states = State.create(data.states);

    for (const state of states) {
      await state.save();

      this.createStateHistory(state);
    }

    return states;
  }

  @Mutation(() => Response)
  public async deleteEnumerations(@Arg('data') data: DeleteEnumerationsInput): Promise<Response> {
    const enumerations = await StateEnumeration.find({
      where: {
        stateId: data.stateId
      }
    });

    // Loop over the ids that we're trying to delete, find and delete the associated enumeration.
    for (const id of data.enumerationIds) {
      // TODO: Right now we're saving IDs as ints, so === comparison won't work.  Fix later.
      const enumeration = enumerations.find((e) => e.id == id);

      if (!enumeration) {
        throw new UserInputError(`Enumeration with given id: ${id} not found`);
      }

      await enumeration.remove();
    }

    return {
      success: true
    };
  }

  @FieldResolver()
  public async enumerations(@Root() state: State): Promise<StateEnumeration[]> {
    return StateEnumeration.find({
      where: {
        stateId: state.id
      }
    });
  }

  @Mutation(() => [ StateEnumeration ])
  public async saveEnumerations(@Arg('data') data: SaveEnumerationsInput): Promise<StateEnumeration[]> {
    const savedEnumerations = [];
    let currentEnumeration;

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

          currentEnumeration.id = currentEnumeration.id;

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

    return savedEnumerations;
  }

  @Query(() => State)
  public state(@Args() { id }: IdArgs): Promise<State | undefined> {
    return State.findOne({
      where: {
        id
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

  @Mutation(() => State)
  public async updateState(@Arg('data') data: UpdateStateInput): Promise<State> {
    const state = await this.state({ id: data.id });

    // If we can't find a state with the given ID, error.
    if (!state) {
      throw new UserInputError(`State with provided id ${data.id} not found`);
    }

    this.validationService.isDuplicateIdentifier(await this.states({ collectionId: state.collectionId }), data.identifier, state.id);

    Object.assign(state, data);
    await state.save();

    this.createStateHistory(state);

    return state;
  }

  private createStateHistory(state: State): void {
    const stateHistory = StateHistory.create(state);
    stateHistory.stateId = state.id;
    stateHistory.updated = new Date();

    stateHistory.save();
  }
}
