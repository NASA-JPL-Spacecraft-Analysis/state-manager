import gql from 'graphql-tag';

export const CREATE_RELATIONSHIP = gql(`
  mutation CreateRelationship(
    $collectionId: ID!
    $description: String
    $displayName: String!
    $subjectType: String!
    $subjectTypeId: ID!
    $targetType: String!
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
      message
      relationship {
        description
        displayName
        id
        subjectType
        subjectTypeId
        targetType
        targetTypeId
      }
      success
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
      message
      relationships {
        description
        displayName
        id
        subjectType
        subjectTypeId
        targetType
        targetTypeId
      }
      success
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

export const UPDATE_RELATIONSHIP = gql(`
  mutation UpdateRelationship(
    $description: String
    $displayName: String!
    $id: ID!
    $subjectType: String!
    $subjectTypeId: ID!
    $targetType: String!
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
      message
      relationship {
        description
        displayName
        id
        subjectType
        subjectTypeId
        targetType
        targetTypeId
      }
      success
    }
  }
`);
