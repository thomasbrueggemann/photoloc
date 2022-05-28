import { Location } from "./location";

export interface LocationsState {
  readonly locations: Location[];
}

export const initialState: LocationsState = {
  locations: [],
};
