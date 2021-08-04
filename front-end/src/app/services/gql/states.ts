import gql from 'graphql-tag';

export const CREATE_STATE = gql(`
  mutation CreateState(
    $collectionId: ID!
    $dataType: String!
    $description: String
    $displayName: String!
    $enumerations: [ModifyStateEnumeration!]
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
        enumerations: $enumerations
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
        enumerations {
          stateId
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

export const GET_STATE_ENUMERATION_HISTORY = gql(`
  query stateEnumerationHistory($collectionId: ID!) {
    stateEnumerationHistory(collectionId: $collectionId) {
      id
      label
      stateEnumerationId
      stateId
      updated
      value
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

export const UPDATE_STATE = gql(`
  mutation UpdateState(
    $dataType: String!
    $description: String
    $displayName: String!
    $enumerations: [ModifyStateEnumeration!]
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
        enumerations: $enumerations
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
        enumerations {
          label
          id
          stateId
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
      success
    }
  }
`);
