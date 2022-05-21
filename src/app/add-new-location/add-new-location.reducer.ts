import { createReducer, on } from '@ngrx/store';
import { setLocation } from './add-new-location.actions';
import { AddNewLocationState } from './add-new-location.state';

export const initialState: AddNewLocationState = {
  location: undefined,
};

export const addNewLocationReducer = createReducer(
  initialState,
  on(setLocation, (state, { location }) => ({ ...state, location }))
);
