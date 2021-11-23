import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { ConstraintActions, FileUploadActions } from '../actions';
import { mapIdentifiers, mapItems } from '../functions/helpers';
import { Constraint, ConstraintMap, IdentifierMap } from '../models';

export interface ConstraintState {
  constraintHistory: Constraint[];
  constraintIdentifierMap: IdentifierMap;
  constraintMap: ConstraintMap;
  selectedConstraintId: string;
}

export const initialState: ConstraintState = {
  constraintHistory: undefined,
  constraintIdentifierMap: undefined,
  constraintMap: undefined,
  selectedConstraintId: undefined
};

export const reducer = createReducer(
  initialState,
  on(ConstraintActions.createConstraintSuccess, (state, { constraint }) => modifyConstraint(state, constraint)),
  on(ConstraintActions.setConstraintHistory, (state, { constraintHistory }) => ({
    ...state,
    constraintHistory
  })),
  on(ConstraintActions.setConstraints, (state, { constraints }) => ({
    ...state,
    constraintIdentifierMap: {
      ...mapIdentifiers(constraints)
    },
    constraintMap: {
      ...mapItems(constraints) as ConstraintMap
    }
  })),
  on(ConstraintActions.setSelectedConstraint, (state, { id }) => ({
    ...state,
    selectedConstraintId: id
  })),
  on(ConstraintActions.updateConstraintSuccess, (state, { constraint }) => modifyConstraint(state, constraint)),
  on(FileUploadActions.uploadConstraintsSuccess, (state, { constraints }) => ({
    ...state,
    constraintMap: {
      ...state.constraintMap,
      ...mapItems(constraints) as ConstraintMap
    },
    constraintIdentifierMap: {
      ...state.constraintIdentifierMap,
      ...mapIdentifiers(constraints)
    }
  }))
);

const modifyConstraint = (state: ConstraintState, constraint: Constraint): ConstraintState => {
  const constraintIdentifierMap = cloneDeep(state.constraintIdentifierMap);

  for (const identifier of Object.keys(constraintIdentifierMap)) {
    let index = 0;

    for (const item of constraintIdentifierMap[identifier]) {
      if (item.id === constraint.id) {
        constraintIdentifierMap[identifier] = constraintIdentifierMap[identifier].splice(index, 1);
      }

      index++;
    }
  }
  return {
    ...state,
    constraintIdentifierMap: {
      ...state.constraintIdentifierMap,
      [constraint.identifier]: [
        ...constraintIdentifierMap[constraint.identifier],
        {
          id: constraint.id,
          type: constraint.type
        }
      ]
    },
    constraintMap: {
      ...state.constraintMap,
      [constraint.id]: {
        ...constraint
      }
    },
    selectedConstraintId: constraint.id
  };
};
