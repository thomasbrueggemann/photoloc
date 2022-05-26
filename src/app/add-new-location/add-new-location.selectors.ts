import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AddNewLocationState } from './add-new-location.state';

const addNewLocation =
  createFeatureSelector<AddNewLocationState>('addNewLocation');

export const locationSelector = createSelector(
  addNewLocation,
  (state) => state.currentLocation
);

export const weatherSelector = createSelector(
  addNewLocation,
  (state) => state.weather
);

export const lastWeatherLocationSelector = createSelector(
  addNewLocation,
  (state) => state.lastWeatherLocation
);