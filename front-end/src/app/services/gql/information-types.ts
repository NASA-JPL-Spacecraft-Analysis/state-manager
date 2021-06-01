import gql from 'graphql-tag';

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
