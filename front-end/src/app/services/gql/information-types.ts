import gql from 'graphql-tag';

export const CREATE_INFORMATION_TYPES = gql(`
  mutation createInformationTypes(
    $collectionId: ID!
    $informationTypes: [CreateInformationTypeInput!]!
  ) {
    createInformationTypes(
      data: {
        collectionId: $collectionId
        informationTypes: $informationTypes
      }
    ) {
      informationTypes {
        id
        identifier
        description
        displayName
        externalLink
        type
      }
      message
      success
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
