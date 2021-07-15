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

export const CREATE_STATE = gql(`
  mutation CreateState(
    $collectionId: ID!
    $dataType: String!
    $description: String
    $displayName: String!
    $externalLink: String
    $identifier: String!
    $source: String!
    $subsystem: String!
    $type: String!
    $units: String!
  ) {
    createState(
      data: {
        collectionId: $collectionId
        dataType: $dataType
        description: $description
        displayName: $displayName
        externalLink: $externalLink
        identifier: $identifier
        source: $source
        subsystem: $subsystem
        type: $type
        units: $units
      }
    ) {
      message
      state {
        collectionId
        dataType
        description
        displayName
        externalLink
        id
        identifier
        source
        subsystem
        type
        units
      }
      success
    }
  }
`);

export const CREATE_STATES = gql(`
  mutation CreateStates(
    $collectionId: ID!
    $states: [CreateStateInput!]!
  ) {
    createStates(
      data: {
        collectionId: $collectionId
        states: $states
      }
    ) {
      message
      states {
        collectionId
        dataType
        description
        displayName
        externalLink
        id
        identifier
        source
        subsystem
        type
        units
      }
      success
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

export const DELETE_ENUMERATIONS = gql(`
  mutation DeleteEnumerations(
    $enumerationIds: [ID!]!
    $stateId: ID!
  ) {
    deleteEnumerations(
      data: {
        enumerationIds: $enumerationIds
        stateId: $stateId
      }
    ) {
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

export const GET_STATES = gql(`
  query states($collectionId: ID!) {
    states(collectionId: $collectionId) {
      dataType
      description
      displayName
      editable
      enumerations {
        id
        label
        value
      }
      externalLink
      id
      identifier
      source
      subsystem
      type
      units
    }
  }
`);

export const GET_STATE_HISTORY = gql(`
  query stateHistory($collectionId: ID!) {
    stateHistory(collectionId: $collectionId) {
      dataType
      description
      displayName
      editable
      externalLink
      id
      identifier
      source
      stateId
      subsystem
      type
      units
      updated
    }
  }
`);

export const SAVE_ENUMERATIONS = gql(`
  mutation SaveEnumerations(
    $collectionId: ID!
    $enumerations: [StateEnumerationInput!]!
  ) {
    saveEnumerations(
      data: {
        collectionId: $collectionId
        enumerations: $enumerations
      }
    ) {
      enumerations {
        id
        label
        value
        stateId
      }
      message
      success
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

export const UPDATE_STATE = gql(`
  mutation UpdateState(
    $dataType: String!
    $description: String
    $displayName: String!
    $externalLink: String
    $id: ID!
    $identifier: String!
    $source: String!
    $subsystem: String!
    $type: String!
    $units: String!
  ) {
    updateState(
      data: {
        dataType: $dataType
        description: $description
        displayName: $displayName
        externalLink: $externalLink
        id: $id
        identifier: $identifier
        source: $source
        subsystem: $subsystem
        type: $type
        units: $units
      }
    ) {
      message
      state {
        collectionId
        dataType
        description
        displayName
        externalLink
        id
        identifier
        source
        subsystem
        type
        units
      }
      success
    }
  }
`);
