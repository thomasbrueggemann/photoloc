export interface AddNewLocationState {
  readonly currentLocation?: GeolocationPosition;
  readonly lastWeatherLocation?: GeolocationPosition;
}

export const initialState: AddNewLocationState = {
  currentLocation: undefined,
  lastWeatherLocation: undefined,
};
