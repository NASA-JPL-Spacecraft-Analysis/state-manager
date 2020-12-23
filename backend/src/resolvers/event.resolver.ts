import { Resolver, Query, Arg, Mutation, Args } from 'type-graphql';
import { UserInputError } from 'apollo-server';

import { CollectionIdArgs, IdArgs } from '../args';
import { Event, EventHistory } from './../models';
import { CreateEventInput, CreateEventsInput, UpdateEventInput } from '../inputs/event';
import { ValidationService } from '../service';

@Resolver()
export class EventResolver {
  constructor(
    private readonly validationService: ValidationService
  ) {}

  @Mutation(() => Event)
  public async createEvent(@Arg('data') data: CreateEventInput): Promise<Event> {
    this.validationService.isDuplicateIdentifier(await this.events({ collectionId: data.collectionId}), data.identifier);

    const event = Event.create(data);
    event.editable = true;
    await event.save();

    this.createEventHistory(event);

    return event;
  }

  @Mutation(() => [ Event ])
  public async createEvents(@Arg('data') data: CreateEventsInput): Promise<Event[]> {
    for (const event of data.events) {
      this.validationService.isDuplicateIdentifier(await this.events({ collectionId: data.collectionId }), event.identifier);

      event.collectionId = data.collectionId;
    }

    const events = Event.create(data.events);

    for (const event of events) {
      event.editable = true;
      await event.save();

      this.createEventHistory(event);
    }

    return events;
  }

  @Query(() => [ Event ])
  public events(@Args() { collectionId }: CollectionIdArgs): Promise<Event[]> {
    return Event.find({
      where: {
        collectionId
      }
    });
  }

  @Query(() => Event)
  public event(@Args() { id }: IdArgs): Promise<Event | undefined> {
    return Event.findOne({
      where: {
        id
      }
    });
  }

  @Mutation(() => Event)
  public async updateEvent(@Arg('data') data: UpdateEventInput): Promise<Event> {
    const event = await this.event({ id: data.id });

    if (!event) {
      throw new UserInputError(`Event with provided id ${data.id} not found`);
    }

    this.validationService.isDuplicateIdentifier(await this.events({ collectionId: event.collectionId}), data.identifier, event.id);

    Object.assign(event, data);
    await event.save();

    this.createEventHistory(event);

    return event;
  }

  private createEventHistory(event: Event): void {
    const eventHistory = EventHistory.create(event);
    eventHistory.eventId = event.id;
    eventHistory.updated = new Date();

    eventHistory.save();
  }
}
