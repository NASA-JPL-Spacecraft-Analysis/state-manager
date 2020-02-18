import { createAction, props } from '@ngrx/store';

export const toggleSidenav = createAction(
  '[layout] toggle_sidenav',
  props<{ showSidenav: boolean }>()
);
