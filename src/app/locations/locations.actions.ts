import { createAction, props } from '@ngrx/store';

export const addLocation = createAction(
  '[Location] addLocation',
  props<{ location: Location }>()
);

export const getAllLocations = createAction('[Location] getAllLocations');
