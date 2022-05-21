import { createAction, props } from '@ngrx/store';

export const setLocation = createAction(
  '[Add New Location Component] setLocation',
  props<{ location: GeolocationPosition }>()
);
