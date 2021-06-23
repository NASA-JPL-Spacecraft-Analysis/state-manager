import gql from 'graphql-tag';

export const CREATE_COMMAND = gql(`
  mutation CreateCommand(
    $collectionId: ID!
    $description: String
    $displayName: String!
    $editable: Boolean!
    $externalLink: String
    $identifier: String!
    $type: String!
  ) {
    createCommand(
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
      command {
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

export const CREATE_COMMANDS = gql(`
  mutation CreateCommands(
    $collectionId: ID!
    $commands: [CreateCommandInput!]!
  ) {
    createCommands(
      data: {
        collectionId: $collectionId
        commands: $commands
      }
    ) {
      commands {
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

export const GET_COMMAND_HISTORY = gql(`
  query CommandHistory($collectionId: ID!) {
    commandHistory(collectionId: $collectionId) {
      arguments {
        name
        sortOrder
      }
      commandId
      collectionId
      description
      displayName
      editable
      externalLink
      id
      identifier
      type
      updated
    }
  }
`);

export const GET_COMMANDS = gql(`
  query Commands($collectionId: ID!) {
    commands(collectionId: $collectionId) {
      arguments {
        name
        sortOrder
      }
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


export const UPDATE_COMMAND = gql(`
  mutation UpdateCommand(
    $description: String
    $displayName: String
    $editable: Boolean
    $externalLink: String
    $id: ID!
    $identifier: String!
    $type: String!
  ) {
    updateCommand(
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
      command {
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
