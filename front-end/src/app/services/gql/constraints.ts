import gql from 'graphql-tag';

export const CREATE_CONSTRAINT = gql(`
  mutation CreateConstraint(
    $collectionId: ID!
    $description: String
    $displayName: String!
    $editable: Boolean!
    $externalLink: String
    $identifier: String!
    $type: String!
    $version: String
  ) {
    createConstraint(
      data: {
        collectionId: $collectionId
        description: $description
        displayName: $displayName
        editable: $editable
        externalLink: $externalLink
        identifier: $identifier
        type: $type
        version: $version
      }
    ) {
      constraint {
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

export const CREATE_CONSTRAINTS = gql(`
  mutation CreateConstraints(
    $collectionId: ID!
    $constraints: [CreateConstraintInput!]!
  ) {
    createConstraints(
      data: {
        collectionId: $collectionId
        constraints: $constraints
      }
    ) {
      constraints {
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

export const GET_CONSTRAINT_HISTORY = gql(`
  query constraintHistory($collectionId: ID!) {
    constraintHistory(collectionId: $collectionId) {
      constraintId
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

export const GET_CONSTRAINTS = gql(`
  query constraints($collectionId: ID!) {
    constraints(collectionId: $collectionId) {
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

export const GET_CONSTRAINT_TYPES = gql(`
  query ConstraintTypes {
    constraintTypes
  }
`);

export const UPDATE_CONSTRAINT = gql(`
  mutation UpdateConstraint(
    $description: String
    $displayName: String
    $editable: Boolean
    $externalLink: String
    $id: ID!
    $identifier: String!
    $type: String!
    $version: String
  ) {
    updateConstraint(
      data: {
        description: $description
        displayName: $displayName
        editable: $editable
        externalLink: $externalLink
        id: $id
        identifier: $identifier
        type: $type
        version: $version
      }
    ) {
      constraint {
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
