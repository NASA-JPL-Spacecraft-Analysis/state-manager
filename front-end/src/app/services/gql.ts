import gql from 'graphql-tag';

export const GET_COLLECTIONS = gql(`
  query {
    collections {
      id
      enabled
      name
    }
  }
`);
