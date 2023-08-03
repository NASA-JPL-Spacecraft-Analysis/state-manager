import { createAction, props } from '@ngrx/store';

import { State } from '../models';
import { FileType } from '../constants/export.constants';

export const exportStates = createAction(
  '[state] exportStates',
  props<{
    states: State[];
    fileType: FileType;
  }>()
);
