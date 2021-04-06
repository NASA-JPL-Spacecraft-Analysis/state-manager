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
    $collectionId: ID!
    $description: String
    $displayName: String
    $editable: Boolean
    $externalLink: String
    $identifier: String!
  ) {
    createEvent(
      data: {
        collectionId: $collectionId
        description: $description
        displayName: $displayName
        editable: $editable
        externalLink: $externalLink
        identifier: $identifier
      }
    ) {
      id
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

export const CREATE_GROUP = gql(`
  mutation CreateGroup(
    $collectionId: ID!
    $groupMappings: [CreateGroupMappingInput!]!
    $name: String!
  ) {
    createGroup(
      data: {
        collectionId: $collectionId
        groupMappings: $groupMappings
        name: $name
      }
    ) {
      groupMappings {
        item {
          ... on Event {
            description
            displayName
            externalLink
            id
            identifier
          }
          ... on InformationType {
            description
            displayName
            externalLink
            id
            identifier
            informationType: type 
          }
          ... on State {
            description
            displayName
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
      }
      id
      name
    }
  }
`);

export const CREATE_INFORMATION_TYPES = gql(`
  mutation CreateInformationTypes(
    $collectionId: ID!
    $informationTypes: [CreateInformationTypeInput!]!
  ) {
    createInformationTypes(
      data: {
        collectionId: $collectionId
        informationTypes: $informationTypes
      }
    ) {
      id
      identifier
      description
      displayName
      externalLink
      type
    }
  }
`);

export const CREATE_RELATIONSHIP = gql(`
  mutation CreateRelationship(
    $collectionId: ID!
    $description: String
    $displayName: String!
    $subjectType: InformationTypeEnum!
    $subjectTypeId: ID!
    $targetType: InformationTypeEnum!
    $targetTypeId: ID!
  ) {
    createRelationship(
      data: {
        collectionId: $collectionId
        description: $description
        displayName: $displayName
        subjectType: $subjectType
        subjectTypeId: $subjectTypeId
        targetType: $targetType
        targetTypeId: $targetTypeId
      }
    ) {
      description
      displayName
      id
      subjectType
      subjectTypeId
      targetType
      targetTypeId
    }
  }
`);

export const CREATE_RELATIONSHIPS = gql(`
  mutation CreateRelationships(
    $collectionId: ID!
    $relationships: [UploadRelationshipInput!]!
  ) {
    createRelationships(
      data: {
        collectionId: $collectionId
        relationships: $relationships
      }
    ) {
      description
      displayName
      id
      subjectType
      subjectTypeId
      targetType
      targetTypeId
    }
  }
`);

export const CREATE_STATE = gql(`
  mutation CreateState(
    $collectionId: ID!
    $description: String
    $displayName: String!
    $identifier: String!
    $source: String!
    $subsystem: String!
    $type: String!
    $units: String!
  ) {
    createState(
      data: {
        collectionId: $collectionId
        description: $description
        displayName: $displayName
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
    $collectionId: ID!
    $states: [CreateStateInput!]!
  ) {
    createStates(
      data: {
        collectionId: $collectionId
        states: $states
      }
    ) {
      description
      displayName
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
    $id: ID!
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

export const GET_COLLECTIONS = gql(`
  query collections{
    collections {
      id
      name
    }
  }
`);

export const GET_EVENTS = gql(`
  query events($collectionId: ID!) {
    events(collectionId: $collectionId) {
      description
      displayName
      externalLink
      id
      identifier
    }
  }
`);

export const GET_EVENT_HISTORY = gql(`
  query eventHistory($collectionId: ID!) {
    eventHistory(collectionId: $collectionId) {
      description
      displayName
      eventId
      externalLink
      id
      identifier
      updated
    }
  }
`);

export const GET_GROUPS_AND_MAPPINGS = gql(`
  query groups($collectionId: ID!) {
    groups(collectionId: $collectionId) {
      name
      id
      groupMappings {
        item {
          ... on Event {
            description
            displayName
            externalLink
            id
            identifier
          }
          ... on InformationType {
            description
            displayName
            externalLink
            id
            identifier
            informationType: type 
          }
          ... on State {
            description
            displayName
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
      }
    }
  }
`);

export const GET_INFORMATION_TYPES = gql(`
  query informationTypes($collectionId: ID!) {
    informationTypes(collectionId: $collectionId) {
      description
      displayName
      externalLink
      id
      identifier
      type 
    }
  }
`);

export const GET_RELATIONSHIPS = gql(`
  query relationships($collectionId: ID!) {
    relationships(collectionId: $collectionId) {
      description
      displayName
      id
      subjectType
      subjectTypeId
      targetType
      targetTypeId
    }
  }
`);

export const GET_RELATIONSHIP_HISTORY = gql(`
  query relationshipHistory($collectionId: ID!) {
    relationshipHistory(collectionId: $collectionId) {
      description
      displayName
      id
      relationshipId
      subjectType
      subjectTypeId
      targetType
      targetTypeId
      updated
    }
  }
`);

export const GET_STATES = gql(`
  query states($collectionId: ID!) {
    states(collectionId: $collectionId) {
      description
      displayName
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
  query stateHistory($collectionId: ID!) {
    stateHistory(collectionId: $collectionId) {
      description
      displayName
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
      id
      label
      value
      stateId
    }
  }
`);

export const UPDATE_COLLECTION = gql(`
  mutation UpdateCollection(
    $id: ID!
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
    $id: ID!
    $identifier: String!
  ) {
    updateEvent(
      data: {
        description: $description
        displayName: $displayName
        editable: $editable
        externalLink: $externalLink
        id: $id
        identifier: $identifier
      }
    ) {
      id
    }
  }
`);

export const UPDATE_GROUP = gql(`
  mutation UpdateGroup(
    $groupMappings: [CreateGroupMappingInput!]!
    $id: ID!
    $name: String!
  ) {
    updateGroup(
      data: {
        groupMappings: $groupMappings
        id: $id
        name: $name
      }
    ) {
      groupMappings {
        item {
          ... on Event {
            description
            displayName
            externalLink
            id
            identifier
          }
          ... on InformationType {
            description
            displayName
            externalLink
            id
            identifier
            informationType: type 
          }
          ... on State {
            description
            displayName
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
      }
      id
      name
    }
  }
`);

export const UPDATE_RELATIONSHIP = gql(`
  mutation UpdateRelationship(
    $description: String
    $displayName: String!
    $id: ID!
    $subjectType: InformationTypeEnum!
    $subjectTypeId: ID!
    $targetType: InformationTypeEnum!
    $targetTypeId: ID!
  ) {
    updateRelationship(
      data: {
        description: $description
        displayName: $displayName
        id: $id
        subjectType: $subjectType
        subjectTypeId: $subjectTypeId
        targetType: $targetType
        targetTypeId: $targetTypeId
      }
    ) {
      description
      displayName
      id
      subjectType
      subjectTypeId
      targetType
      targetTypeId
    }
  }
`);

export const UPDATE_STATE = gql(`
  mutation UpdateState(
    $description: String
    $displayName: String!
    $id: ID!
    $identifier: String!
    $source: String!
    $subsystem: String!
    $type: String!
    $units: String!
  ) {
    updateState(
      data: {
        description: $description
        displayName: $displayName
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
