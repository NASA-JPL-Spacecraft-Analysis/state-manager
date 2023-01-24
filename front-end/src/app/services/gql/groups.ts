import gql from 'graphql-tag';

const MAX_GROUP_DEPTH = 5;

const generateRecursiveGroupCall = (query: string, depth = 1): string => {
  if (depth === MAX_GROUP_DEPTH) {
    return query;
  }

  query = groupMappingItemQuery(query);

  depth += 1;

  return generateRecursiveGroupCall(query, depth);
};

const groupMappingItemQuery = (itemQuery: string): string =>
  `
  item {
    ... on Command {
      description
      displayName
      externalLink
      id
      identifier
    }
    ... on CommandArgument {
      commandId
      id
      name
      sortOrder
    }
    ... on CommandArgumentEnumeration {
      commandArgumentId
      label
      id
      value
    }
    ... on Constraint {
      description
      displayName
      externalLink
      id
      identifier
    }
    ... on Event {
      description
      displayName
      externalLink
      id
      identifier
    }
    ... on Group {
      id
      identifier
      groupMappings {
        groupId
        ${itemQuery ? itemQuery : ''}
      }
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
`;

export const CREATE_GROUP = gql(`
  mutation CreateGroup(
    $collectionId: ID!
    $groupMappings: [CreateGroupMappingInput!]!
    $identifier: String!
  ) {
    createGroup(
      data: {
        collectionId: $collectionId
        groupMappings: $groupMappings
        identifier: $identifier
      }
    ) {
      group {
        groupMappings {
          groupId
          ${generateRecursiveGroupCall('')}
        }
        id
        identifier
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
        ${generateRecursiveGroupCall('')}
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
          groupId
          ${generateRecursiveGroupCall('')}
        }
        id
        identifier
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
      identifier
      id
      identifier
      groupMappings {
        groupId
        ${generateRecursiveGroupCall('')}
      }
    }
  }
`);

export const UPDATE_GROUP = gql(`
  mutation UpdateGroup(
    $collectionId: ID!
    $groupMappings: [CreateGroupMappingInput!]!
    $id: ID!
    $identifier: String!
  ) {
    updateGroup(
      data: {
        collectionId: $collectionId
        groupMappings: $groupMappings
        id: $id
        identifier: $identifier
      }
    ) {
      group {
        groupMappings {
          groupId
          ${generateRecursiveGroupCall('')}
        }
        id
        identifier
      }
      message
      success
    }
  }
`);
