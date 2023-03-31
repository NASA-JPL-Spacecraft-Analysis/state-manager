import { createAction, props } from '@ngrx/store';

export const isLoading = createAction('[layout] isLoading', props<{ isLoading: boolean }>());

export const isSaving = createAction('[layout] isSaving', props<{ isSaving: boolean }>());

export const openFileUploadDialog = createAction(
  '[layout] openFileUploadDialog',
  props<{
    collectionId: string;
    csvFormat: string[];
    dialogType: string;
    jsonFormat: string;
    types?: string[];
  }>()
);

export const toggleSidenav = createAction(
  '[layout] toggleSidenav',
  props<{ showSidenav: boolean }>()
);
