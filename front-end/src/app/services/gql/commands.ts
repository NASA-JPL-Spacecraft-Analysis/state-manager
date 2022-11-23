import gql from 'graphql-tag';

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
        description
        enums
        name
        id
        sortOrder
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
        arguments {
          collectionId
          commandId
          description
          enums
          name
          id
          sortOrder
          type
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

export const GET_COMMAND_ARGUMENT_HISTORY = gql(`
  query CommandArgumentHistory($collectionId: ID!) {
    commandArgumentHistory(collectionId: $collectionId) {
      collectionId
      commandArgumentId
      commandId
      description
      enums
      name
      id
      sortOrder
      type
      updated
    }
  }
`);

export const GET_COMMAND_ARGUMENTS = gql(`
  query CommandArguments($collectionId: ID!) {
    commandArguments(collectionId: $collectionId) {
      collectionId
      commandId
      description
      enums
      name
      id
      sortOrder
      type
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

export const GET_COMMAND_TYPES = gql(`
  query CommandTypes {
    commandTypes
  }
`);
