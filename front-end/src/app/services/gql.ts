import gql from 'graphql-tag';

export const CREATE_COLLECTION = gql(`
  mutation CreateCollection(
    $name: String!
  ) {
    createCollection(
      data: {
        name: $name
      }
    ) {
      id
      name
    }
  }
`);

export const CREATE_EVENT = gql(`
  mutation CreateEvent(
    $collection_id: Float!
    $description: String
    $displayName: String
    $editable: Boolean
    $externalLink: String
    $identifier: String!
  ) {
    createEvent(
      data: {
        collection_id: $collection_id
        description: $description
        display_name: $displayName
        editable: $editable
        external_link: $externalLink
        identifier: $identifier
      }
    ) {
      id
    }
  }
`);

export const CREATE_INFORMATION_TYPES = gql(`
  mutation CreateInformationTypes(
    $collection_id: Float!
    $informationTypes: [CreateInformationTypeInput!]!
  ) {
    createInformationTypes(
      data: {
        collection_id: $collection_id
        informationTypes: $informationTypes
      }
    ) {
      id
      identifier
      description
      displayName: display_name
      externalLink: external_link
      type
    }
  }
`);

export const CREATE_STATE = gql(`
  mutation CreateState(
    $collection_id: Float!
    $description: String
    $display_name: String!
    $identifier: String!
    $source: String!
    $subsystem: String!
    $type: String!
    $units: String!
  ) {
    createState(
      data: {
        collection_id: $collection_id
        description: $description
        display_name: $display_name
        identifier: $identifier
        source: $source
        subsystem: $subsystem
        type: $type
        units: $units
      }
    ) {
      id
    }
  }
`);

export const CREATE_STATES = gql(`
  mutation CreateStates(
    $collection_id: Float!
    $states: [CreateStateInput!]!
  ) {
    createStates(
      data: {
        collection_id: $collection_id
        states: $states
      }
    ) {
      description
      displayName: display_name
      id
      identifier
      source
      subsystem
      type
      units
    }
  }
`);

export const DELETE_COLLECTION = gql(`
  mutation DeleteCollection(
    $id: Float!
  ) {
    deleteCollection(
      id: $id
    ) {
      success
    }
  }
`);

export const DELETE_ENUMERATIONS = gql(`
  mutation DeleteEnumerations(
    $enumerationIds: [ID!]!
    $state_id: ID!
  ) {
    deleteEnumerations(
      data: {
        enumerationIds: $enumerationIds
        state_id: $state_id
      }
    ) {
      success
    }
  }
`);

export const GET_COLLECTIONS = gql(`
  query collections{
    collections {
      id
      name
    }
  }
`);

export const GET_EVENTS = gql(`
  query events($collection_id: Float!) {
    events(collection_id: $collection_id) {
      description
      displayName: display_name
      externalLink: external_link
      id
      identifier
    }
  }
`);

export const GET_EVENT_HISTORY = gql(`
  query eventHistory($collection_id: Float!) {
    eventHistory(collection_id: $collection_id) {
      description
      displayName: display_name
      eventId: event_id
      externalLink: external_link
      id
      identifier
      updated
    }
  }
`);

export const GET_INFORMATION_TYPES = gql(`
  query informationTypes($collection_id: Float!) {
    informationTypes(collection_id: $collection_id) {
      description
      displayName: display_name
      externalLink: external_link
      id
      identifier
      type
    }
  }
`);

export const GET_RELATIONSHIPS = gql(`
  query relationships($collection_id: Float!) {
    relationships(collection_id: $collection_id) {
      description
      displayName: display_name
      id
      subjectType: subject_type
      subjectTypeId: subject_type_id
      targetType: target_type
      targetTypeId: target_type_id
    }
  }
`);

export const GET_RELATIONSHIP_HISTORY = gql(`
  query relationshipHistory($collection_id: Float!) {
    relationshipHistory(collection_id: $collection_id) {
      description
      displayName: display_name
      id
      relationshipId: relationship_id
      subjectType: subject_type
      targetType: target_type
      updated
    }
  }
`);

export const GET_STATES = gql(`
  query states($collection_id: Float!) {
    states(collection_id: $collection_id) {
      description
      displayName: display_name
      enumerations {
        id
        label
        value
      }
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
  query stateHistory($collection_id: Float!) {
    stateHistory(collection_id: $collection_id) {
      description
      displayName: display_name
      id
      identifier
      source
      stateId: state_id
      subsystem
      type
      units
      updated
    }
  }
`);

export const SAVE_ENUMERATIONS = gql(`
  mutation SaveEnumerations(
    $collection_id: Float!
    $enumerations: [StateEnumerationInput!]!
  ) {
    saveEnumerations(
      data: {
        collection_id: $collection_id
        enumerations: $enumerations
      }
    ) {
      id
      label
      value
      stateId: state_id
    }
  }
`);

export const UPDATE_COLLECTION = gql(`
  mutation UpdateCollection(
    $id: Float!
    $name: String!
  ) {
    updateCollection(
      data: {
        id: $id
        name: $name
      }
    ) {
      id
      name
    }
  }
`);

export const UPDATE_EVENT = gql(`
  mutation UpdateEvent(
    $description: String
    $displayName: String
    $editable: Boolean
    $externalLink: String
    $id: Float!
    $identifier: String!
  ) {
    updateEvent(
      data: {
        description: $description
        display_name: $displayName
        editable: $editable
        external_link: $externalLink
        id: $id
        identifier: $identifier
      }
    ) {
      id
    }
  }
`);

export const UPDATE_STATE = gql(`
  mutation UpdateState(
    $description: String
    $display_name: String!
    $id: Float!
    $identifier: String!
    $source: String!
    $subsystem: String!
    $type: String!
    $units: String!
  ) {
    updateState(
      data: {
        description: $description
        display_name: $display_name
        id: $id
        identifier: $identifier
        source: $source
        subsystem: $subsystem
        type: $type
        units: $units
      }
    ) {
      id
    }
  }
`);
