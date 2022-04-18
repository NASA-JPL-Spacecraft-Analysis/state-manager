import gql from 'graphql-tag';

export const CREATE_STATE = gql(`
  mutation CreateState(
    $channelId: String
    $collectionId: ID!
    $dataType: String!
    $description: String
    $displayName: String!
    $enumerations: [ModifyStateEnumeration!]
    $externalLink: String
    $identifier: String!
    $restricted: Boolean!
    $source: String!
    $subsystem: String!
    $type: String!
    $units: String!
    $version: String
  ) {
    createState(
      data: {
        channelId: $channelId
        collectionId: $collectionId
        dataType: $dataType
        description: $description
        displayName: $displayName
        enumerations: $enumerations
        externalLink: $externalLink
        identifier: $identifier
        restricted: $restricted
        source: $source
        subsystem: $subsystem
        type: $type
        units: $units
        version: $version
      }
    ) {
      message
      state {
        channelId
        collectionId
        dataType
        description
        displayName
        enumerations {
          collectionId
          label
          id
          stateId
          value
        }
        externalLink
        id
        identifier
        restricted
        source
        subsystem
        type
        units
        version
      }
      success
    }
  }
`);

export const CREATE_STATE_ENUMERATIONS = gql(`
  mutation CreateStateEnumerations(
    $collectionId: ID!
    $stateEnumerations: [CreateStateEnumerationInput!]!
  ) {
    createStateEnumerations(
      data: {
        collectionId: $collectionId
        stateEnumerations: $stateEnumerations
      }
    ) {
      message
      stateEnumerations {
        collectionId
        label
        id
        stateId
        value
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
        channelId
        collectionId
        dataType
        description
        displayName
        externalLink
        id
        identifier
        restricted
        source
        subsystem
        type
        units
        version
      }
      success
    }
  }
`);

export const GET_STATE_ENUMERATION_HISTORY = gql(`
  query stateEnumerationHistory($collectionId: ID!) {
    stateEnumerationHistory(collectionId: $collectionId) {
      collectionId
      id
      label
      stateEnumerationId
      stateId
      updated
      value
    }
  }
`);

export const GET_STATE_ENUMERATIONS = gql(`
  query stateEnumerations($collectionId: ID!) {
    stateEnumerations(collectionId: $collectionId) {
      collectionId
      label
      id
      stateId
      value
    }
  }
`);

export const GET_STATES = gql(`
  query states($collectionId: ID!) {
    states(collectionId: $collectionId) {
      channelId
      dataType
      description
      displayName
      editable
      externalLink
      id
      identifier
      restricted
      source
      subsystem
      type
      units
      version
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
      deletedEnumerationIds
      message
      success
    }
  }
`);

export const GET_STATE_HISTORY = gql(`
  query stateHistory($collectionId: ID!) {
    stateHistory(collectionId: $collectionId) {
      channelId
      dataType
      description
      displayName
      editable
      externalLink
      id
      identifier
      restricted
      source
      stateId
      subsystem
      type
      units
      updated
      version
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
        collectionId
        label
        id
        stateId
        value
      }
      message
      success
    }
  }
`);

export const UPDATE_STATE = gql(`
  mutation UpdateState(
    $channelId: String
    $dataType: String!
    $description: String
    $displayName: String!
    $enumerations: [ModifyStateEnumeration!]
    $externalLink: String
    $id: ID!
    $identifier: String!
    $restricted: Boolean!
    $source: String!
    $subsystem: String!
    $type: String!
    $units: String!
    $version: String
  ) {
    updateState(
      data: {
        channelId: $channelId
        dataType: $dataType
        description: $description
        displayName: $displayName
        externalLink: $externalLink
        enumerations: $enumerations
        id: $id
        identifier: $identifier
        restricted: $restricted
        source: $source
        subsystem: $subsystem
        type: $type
        units: $units
        version: $version
      }
    ) {
      message
      state {
        channelId
        collectionId
        dataType
        description
        displayName
        enumerations {
          collectionId
          label
          id
          stateId
          value
        }
        externalLink
        id
        identifier
        restricted
        source
        subsystem
        type
        units
        version
      }
      success
    }
  }
`);
