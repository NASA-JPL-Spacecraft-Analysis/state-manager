import gql from 'graphql-tag';

export const CREATE_EVENT = gql(`
  mutation CreateEvent(
    $collectionId: ID!
    $description: String
    $displayName: String
    $editable: Boolean
    $externalLink: String
    $identifier: String!
    $type: String!
  ) {
    createEvent(
      data: {
        collectionId: $collectionId
        description: $description
        displayName: $displayName
        editable: $editable
        externalLink: $externalLink
        identifier: $identifier
        type: $type
      }
    ) {
      event {
        collectionId
        description
        displayName
        editable
        externalLink
        id
        identifier
        type
      }
      message
      success
    }
  }
`);

export const CREATE_EVENTS = gql(`
  mutation CreateEvents(
    $collectionId: ID!
    $events: [CreateEventInput!]!
  ) {
    createEvents(
      data: {
        collectionId: $collectionId
        events: $events
      }
    ) {
      description
      displayName
      externalLink
      id
      identifier
    }
  }
`);

export const DELETE_GROUP = gql(`
  mutation DeleteGroup(
    $id: ID!
  ) {
    deleteGroup(
      id: $id
    ) {
      message
      success
    }
  }
`);

export const GET_EVENTS = gql(`
  query events($collectionId: ID!) {
    events(collectionId: $collectionId) {
      collectionId
      description
      displayName
      editable
      externalLink
      id
      identifier
      type
    }
  }
`);

export const GET_EVENT_HISTORY = gql(`
  query eventHistory($collectionId: ID!) {
    eventHistory(collectionId: $collectionId) {
      collectionId
      description
      displayName
      editable
      eventId
      externalLink
      id
      identifier
      type
      updated
    }
  }
`);

export const UPDATE_EVENT = gql(`
  mutation UpdateEvent(
    $description: String
    $displayName: String
    $editable: Boolean
    $externalLink: String
    $id: ID!
    $identifier: String!
    $type: String!
  ) {
    updateEvent(
      data: {
        description: $description
        displayName: $displayName
        editable: $editable
        externalLink: $externalLink
        id: $id
        identifier: $identifier
        type: $type
      }
    ) {
      event {
        collectionId
        description
        displayName
        editable
        externalLink
        id
        identifier
        type
      }
      message
      success
    }
  }
`);
