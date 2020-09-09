import gql from 'graphql-tag';

export const GET_COLLECTIONS = gql(`
  query {
    collections {
      id
      name
    }
  }
`);

export const GET_RELATIONSHIPS = gql(`
  query relationships($collection_id: Float!) {
    relationships(collection_id: $collection_id) {
      description
      displayName: display_name
      id
      subjectType: subject_type
      subjectTypeId: subject_type_id
      targetType: target_type
      targetTypeId: target_type_id
    }
  }
`);

export const GET_RELATIONSHIP_HISTORY = gql(`
  query relationshipHistory($collection_id: Float!) {
    relationshipHistory(collection_id: $collection_id) {
      description
      displayName: display_name
      id
      relationshipId: relationship_id
      subjectType: subject_type
      targetType: target_type
      updated
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
