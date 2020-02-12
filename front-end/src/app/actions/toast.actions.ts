import { createAction, props } from '@ngrx/store';

export const showToast = createAction(
  '[toast] show_toast',
  props<{ toastType: string, message: string }>()
);
