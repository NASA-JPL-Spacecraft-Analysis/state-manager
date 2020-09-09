import gql from 'graphql-tag';

export const GET_COLLECTIONS = gql(`
  query {
    collections {
      id
      name
    }
  }
`);

export const GET_STATES = gql(`
  query states($collection_id: Float!) {
    states(collection_id: $collection_id) {
      description
      displayName: display_name
      id
      identifier
      source
      subsystem
      type
      units
    }
  }
`);

export const GET_STATE_HISTORY = gql(`
  query stateHistory($collection_id: Float!) {
    stateHistory(collection_id: $collection_id) {
      description
      displayName: display_name
      id
      identifier
      source
      stateId: state_id
      subsystem
      type
      units
      updated
    }
  }
`);
