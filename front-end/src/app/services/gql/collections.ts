import gql from 'graphql-tag';

export const CREATE_COLLECTION = gql(`
  mutation CreateCollection(
    $name: String!
  ) {
    createCollection(
      data: {
        name: $name
      }
    ) {
      collection {
        id
        name
      }
      message
      success
    }
  }
`);

export const DELETE_COLLECTION = gql(`
  mutation DeleteCollection(
    $id: ID!
  ) {
    deleteCollection(
      id: $id
    ) {
      message
      success
    }
  }
`);

export const GET_COLLECTIONS = gql(`
  query collections {
    collections {
      id
      name
    }
  }
`);

export const UPDATE_COLLECTION = gql(`
  mutation UpdateCollection(
    $id: ID!
    $name: String!
  ) {
    updateCollection(
      data: {
        id: $id
        name: $name
      }
    ) {
      collection {
        id
        name
      }
      message
      success
    }
  }
`);
