import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationsState } from './locations.state';

const locations =
    createFeatureSelector<LocationsState>('locations');

export const locationsSelector = createSelector(
    locations,
    (state) => state.locations
);