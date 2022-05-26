import { createReducer, on } from '@ngrx/store';
import { resetStore, setCurrentLocation, setWeather } from './add-new-location.actions';
import { initialState } from './add-new-location.state';

export const addNewLocationReducer = createReducer(
  initialState,
  on(setCurrentLocation, (state, { location }) => ({
    ...state,
    currentLocation: location,
  })),
  on(resetStore, () => initialState),
  on(setWeather, (state, { weather }) => ({
    ...state, weather,
  }))
);
