import { createAction, props } from '@ngrx/store';

export const openFileUploadDialog = createAction(
  '[layout] openFileUploadDialog',
  props<{ collectionId: string, csvFormat: string[], dialogType: string, jsonFormat: string }>()
);

export const toggleGroupsSidemenu = createAction(
  '[layout] toggleGroupsSidemenu',
  props<{ showGroupsSidemenu: boolean }>()
);

export const toggleSidenav = createAction(
  '[layout] toggleSidenav',
  props<{ showSidenav: boolean }>()
);
