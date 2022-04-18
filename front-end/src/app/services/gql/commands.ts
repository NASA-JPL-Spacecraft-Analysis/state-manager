import gql from 'graphql-tag';

export const CREATE_COMMAND = gql(`
  mutation CreateCommand(
    $arguments: [ModifyCommandArgument!]
    $collectionId: ID!
    $description: String
    $displayName: String!
    $editable: Boolean!
    $externalLink: String
    $identifier: String!
    $version: String
  ) {
    createCommand(
      data: {
        arguments: $arguments
        collectionId: $collectionId
        description: $description
        displayName: $displayName
        editable: $editable
        externalLink: $externalLink
        identifier: $identifier
        version: $version
      }
    ) {
      command {
        arguments {
          collectionId
          commandId
          name
          id
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
        version
      }
      message
      success
    }
  }
`);

export const CREATE_COMMAND_ARGUMENTS = gql(`
  mutation CreateCommandArguments(
    $collectionId: ID!
    $commandArguments: [CreateCommandArgumentInput!]!
  ) {
    createCommandArguments(
      data: {
        collectionId: $collectionId
        commandArguments: $commandArguments
      }
    ) {
      commandArguments {
        collectionId
        commandId
        name
        id
        sortOrder
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
        arguments {
          collectionId
          commandId
          name
          id
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
        version
      }
      message
      success
    }
  }
`);

export const DELETE_ARGUMENTS = gql(`
  mutation DeleteArguments(
    $commandId: ID!
    $deletedArgumentIds: [ID!]!
  ) {
    deleteArguments(
      data: {
        commandId: $commandId
        deletedArgumentIds: $deletedArgumentIds
      }
    ) {
      deletedArgumentIds
      message
      success
    }
  }
`);

export const GET_COMMAND_ARGUMENT_HISTORY = gql(`
  query CommandArgumentHistory($collectionId: ID!) {
    commandArgumentHistory(collectionId: $collectionId) {
      collectionId
      commandArgumentId
      commandId
      name
      id
      sortOrder
      updated
    }
  }
`);

export const GET_COMMAND_ARGUMENTS = gql(`
  query CommandArguments($collectionId: ID!) {
    commandArguments(collectionId: $collectionId) {
      collectionId
      commandId
      name
      id
      sortOrder
    }
  }
`);

export const GET_COMMAND_HISTORY = gql(`
  query CommandHistory($collectionId: ID!) {
    commandHistory(collectionId: $collectionId) {
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
      version
    }
  }
`);

export const GET_COMMANDS = gql(`
  query Commands($collectionId: ID!) {
    commands(collectionId: $collectionId) {
      collectionId
      description
      displayName
      editable
      externalLink
      id
      identifier
      type
      version
    }
  }
`);


export const UPDATE_COMMAND = gql(`
  mutation UpdateCommand(
    $arguments: [ModifyCommandArgument!]
    $description: String
    $displayName: String
    $editable: Boolean
    $externalLink: String
    $id: ID!
    $identifier: String!
    $version: String
  ) {
    updateCommand(
      data: {
        arguments: $arguments
        description: $description
        displayName: $displayName
        editable: $editable
        externalLink: $externalLink
        id: $id
        identifier: $identifier
        version: $version
      }
    ) {
      command {
        arguments {
          collectionId
          commandId
          name
          id
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
        version
      }
      message
      success
    }
  }
`);
