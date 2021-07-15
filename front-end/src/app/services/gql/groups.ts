import gql from 'graphql-tag';

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
      group {
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
      message
      success
    }
  }
`);

export const CREATE_GROUP_MAPPINGS = gql(`
  mutation CreateGroupMappings(
    $collectionId: ID!
    $groupMappings: [UploadGroupMappingInput!]!
  ) {
    createGroupMappings(
      data: {
        collectionId: $collectionId
        groupMappings: $groupMappings
      }
    ) {
      groupMappings {
        groupId
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
      message
      success
    }
  }
`);

export const CREATE_GROUPS = gql(`
  mutation CreateGroups(
    $collectionId: ID!
    $groups: [UploadGroupInput!]!
  ) {
    createGroups(
      data: {
        collectionId: $collectionId
        groups: $groups
      }
    ) {
      groups {
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
              dataType
              units
            }
          }
        }
        id
        name
      }
      message
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

export const UPDATE_GROUP = gql(`
  mutation UpdateGroup(
    $collectionId: ID!
    $groupMappings: [CreateGroupMappingInput!]!
    $id: ID!
    $name: String!
  ) {
    updateGroup(
      data: {
        collectionId: $collectionId
        groupMappings: $groupMappings
        id: $id
        name: $name
      }
    ) {
      group {
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
      message
      success
    }
  }
`);

