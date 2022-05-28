export interface Location {
  id: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
  heading: number;
  weather: {
    condition: string;
    temperature: number;
  } | undefined;
}
