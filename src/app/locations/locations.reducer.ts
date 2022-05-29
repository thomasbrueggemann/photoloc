import { createReducer, on } from '@ngrx/store';
import { addLocation } from './locations.actions';
import { initialState } from './locations.state';

export const locationsReducer = createReducer(
  initialState,
  on(addLocation, (state, { location }) => {
    return {
      ...state,
      locations: [...state.locations, location],
    };
  })
);
