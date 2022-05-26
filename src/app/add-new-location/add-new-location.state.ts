import { CurrentWeather } from "./weather/current-weather";

export interface AddNewLocationState {
  readonly currentLocation?: GeolocationPosition;
  readonly lastWeatherLocation?: GeolocationPosition;
  readonly weather?: CurrentWeather
}

export const initialState: AddNewLocationState = {
  currentLocation: undefined,
  lastWeatherLocation: undefined,
  weather: undefined
};
