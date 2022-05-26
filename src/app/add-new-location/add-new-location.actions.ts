import { createAction, props } from '@ngrx/store';
import { CurrentWeather } from './weather/current-weather';

export const setCurrentLocation = createAction(
  '[Add New Location Component] setCurrentLocation',
  props<{ location: GeolocationPosition }>()
);

export const resetStore = createAction(
  '[Add New Location Component] resetStore'
);

export const fetchWeather = createAction(
  '[Add New Location Component] fetchWeather',
  props<{ location: GeolocationPosition }>()
);

export const setWeather = createAction(
  '[Add New Location Component] setWeather',
  props<{ weather: CurrentWeather }>()
);

export const setLastWeatherLocationLocation = createAction(
  '[Add New Location Component] setLastWeatherLocationLocation',
  props<{ location: GeolocationPosition }>()
);
