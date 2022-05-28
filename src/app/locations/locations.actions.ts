import { createAction, props } from '@ngrx/store';
import { Location } from './location';

export const addLocation = createAction(
  '[Location] addLocation',
  props<{ location: Location }>()
);
