import gql from 'graphql-tag';

export const CREATE_RELATIONSHIP = gql(`
  mutation CreateRelationship(
    $collectionId: ID!
    $displayName: String!
    $subjectToTargetDescription: String
    $subjectType: String!
    $subjectTypeId: ID!
    $targetToSubjectDescription: String
    $targetType: String!
    $targetTypeId: ID!
  ) {
    createRelationship(
      data: {
        collectionId: $collectionId
        displayName: $displayName
        subjectToTargetDescription: $subjectToTargetDescription
        subjectType: $subjectType
        subjectTypeId: $subjectTypeId
        targetToSubjectDescription: $targetToSubjectDescription
        targetType: $targetType
        targetTypeId: $targetTypeId
      }
    ) {
      message
      relationship {
        displayName
        id
        subjectToTargetDescription
        subjectType
        subjectTypeId
        targetToSubjectDescription
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
        displayName
        id
        subjectToTargetDescription
        subjectType
        subjectTypeId
        targetToSubjectDescription
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
      displayName
      id
      subjectToTargetDescription
      subjectType
      subjectTypeId
      targetToSubjectDescription
      targetType
      targetTypeId
    }
  }
`);

export const GET_RELATIONSHIP_HISTORY = gql(`
  query relationshipHistory($collectionId: ID!) {
    relationshipHistory(collectionId: $collectionId) {
      displayName
      id
      relationshipId
      subjectToTargetDescription
      subjectType
      subjectTypeId
      targetToSubjectDescription
      targetType
      targetTypeId
      updated
    }
  }
`);

export const UPDATE_RELATIONSHIP = gql(`
  mutation UpdateRelationship(
    $displayName: String!
    $id: ID!
    $subjectToTargetDescription: String
    $subjectType: String!
    $subjectTypeId: ID!
    $targetToSubjectDescription: String
    $targetType: String!
    $targetTypeId: ID!
  ) {
    updateRelationship(
      data: {
        displayName: $displayName
        id: $id
        subjectToTargetDescription: $subjectToTargetDescription
        subjectType: $subjectType
        subjectTypeId: $subjectTypeId
        targetToSubjectDescription: $targetToSubjectDescription
        targetType: $targetType
        targetTypeId: $targetTypeId
      }
    ) {
      message
      relationship {
        displayName
        id
        subjectToTargetDescription
        subjectType
        subjectTypeId
        targetToSubjectDescription
        targetType
        targetTypeId
      }
      success
    }
  }
`);
