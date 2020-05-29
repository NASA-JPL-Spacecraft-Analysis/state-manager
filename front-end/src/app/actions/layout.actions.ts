import { createAction, props } from '@ngrx/store';

export const toggleSidenav = createAction(
  '[layout] toggleSidenav',
  props<{ showSidenav: boolean }>()
);
