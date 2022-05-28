export interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
  heading: number;
  weather: {
    condition: string;
    temperature: number;
  };
}
