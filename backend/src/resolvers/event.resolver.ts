import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';
import { UserInputError } from 'apollo-server';
import { getConnection } from 'typeorm';

import { CollectionIdArgs, IdentifierArgs } from '../args';
import { Event, EventHistory, eventTypes } from './../models';
import { CreateEventInput, CreateEventsInput, UpdateEventInput } from '../inputs/event';
import { ValidationService } from '../service';
import { SharedRepository } from '../repositories';
import { DeleteItemsResponse, EventResponse, EventsResponse } from '../responses';
import { EventConstants } from '../constants';


@Resolver()
export class EventResolver {
  private sharedRepository: SharedRepository<Event>;

  constructor(
    private readonly validationService: ValidationService
  ) {
    this.sharedRepository = new SharedRepository<Event>(getConnection(), Event, validationService);
  }

  @Mutation(() => EventResponse)
  public async createEvent(@Arg('data') data: CreateEventInput): Promise<EventResponse> {
    try {
      this.validationService.isDuplicateIdentifier(
        await this.events({ collectionId: data.collectionId}), data.identifier, data.type);

      const event = Event.create(data);

      this.validationService.hasValidType([ event ], eventTypes);

      await event.save();

      this.createEventHistory(event);

      return {
        event,
        message: 'Event Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => EventsResponse)
  public async createEvents(@Arg('data') data: CreateEventsInput): Promise<EventsResponse> {
    try {
      const existingEvents = await this.events({ collectionId: data.collectionId });

      for (const event of data.events) {
        this.validationService.isDuplicateIdentifier(existingEvents, event.identifier, event.type);

        event.collectionId = data.collectionId;
      }

      const events = Event.create(data.events);

      this.validationService.hasValidType(events, eventTypes);

      for (const event of events) {
        await event.save();

        this.createEventHistory(event);
      }

      return {
        events,
        message: 'Events Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => DeleteItemsResponse)
  public async deleteAllEvents(@Args() { collectionId }: CollectionIdArgs): Promise<DeleteItemsResponse> {
    return this.sharedRepository.deleteAll(collectionId);
  }

  @Query(() => Event)
  public event(@Args() { collectionId, id, identifier }: IdentifierArgs): Promise<Event | undefined> {
    return this.sharedRepository.getOne(collectionId, id, identifier);
  }

  @Query(() => [ EventHistory ])
  public eventHistory(@Args() { collectionId }: CollectionIdArgs): Promise<EventHistory[]> {
    return EventHistory.find({
      where: {
        collectionId
      }
    });
  }

  @Query(() => [ Event ])
  public events(@Args() { collectionId }: CollectionIdArgs): Promise<Event[]> {
    return Event.find({
      where: {
        collectionId
      }
    });
  }

  @Mutation(() => EventResponse)
  public async updateEvent(@Arg('data') data: UpdateEventInput): Promise<EventResponse> {
    try {
      const event = await this.event({ id: data.id });

      if (!event) {
        throw new UserInputError(EventConstants.eventNotFoundError(data.id));
      }

      this.validationService.isDuplicateIdentifier(await this.events({ collectionId: event.collectionId}), data.identifier, data.type);

      Object.assign(event, data);

      this.validationService.hasValidType([ event ], eventTypes);

      await event.save();

      this.createEventHistory(event);

      return {
        event,
        message: 'Event Updated',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  private createEventHistory(event: Event): void {
    const eventHistory = EventHistory.create({
      collectionId: event.collectionId,
      description: event.description,
      displayName: event.displayName,
      editable: event.editable,
      eventId: event.id,
      identifier: event.identifier,
      type: event.type,
      updated: new Date()
    });

    void eventHistory.save();
  }
}
