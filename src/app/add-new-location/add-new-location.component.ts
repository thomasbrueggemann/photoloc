import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LocationsState } from '../locations/locations.state';
import { capitalize } from '../utils';
import { resetStore, setCurrentLocation, storeNewLocation } from './add-new-location.actions';
import {
  locationSelector,
  weatherSelector,
} from './add-new-location.selectors';
import { AddNewLocationState } from './add-new-location.state';
import { CurrentWeather } from './weather/current-weather';

@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.css'],
})
export class AddNewLocationComponent implements OnInit {
  private geoLocationWatch: number | undefined;

  location$: Observable<GeolocationPosition | undefined>;
  weather$: Observable<CurrentWeather | undefined>;

  constructor(
    private addNewLocationStore: Store<AddNewLocationState>,
    private locationsStore: Store<LocationsState>) {

    this.location$ = addNewLocationStore.select(locationSelector);
    this.weather$ = addNewLocationStore.select(weatherSelector);
  }

  private startGeolocationWatch(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    this.geoLocationWatch = navigator.geolocation.watchPosition(
      (location) => this.addNewLocationStore.dispatch(setCurrentLocation({ location })),
      (err) => console.warn('ERROR(' + err.code + '): ' + err.message),
      options
    );
  }

  private stopGeolocationWatch(): void {
    if (this.geoLocationWatch) {
      navigator.geolocation.clearWatch(this.geoLocationWatch);
    }
  }

  private startDeviceOrientationWatch(): void {
    window.addEventListener(
      'deviceorientation',
      this.handleDeviceOrientationChange,
      true
    );
  }

  private stopDeviceOrientationWatch(): void {
    window.removeEventListener(
      'deviceorientation',
      this.handleDeviceOrientationChange
    );
  }

  private handleDeviceOrientationChange(event: DeviceOrientationEvent): void {
    const { alpha, beta, gamma } = event;
    console.log(alpha, beta, gamma);
  }

  displayDate(timestamp: number | undefined): string {
    if (!timestamp) return '';

    return new Date(timestamp).toLocaleString();
  }

  displayHeading(angle: number | null | undefined): string {
    if (!angle) return '-';

    const index =
      Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;

    const directions = [
      'North',
      'North-West',
      'West',
      'South-West',
      'South',
      'South-East',
      'East',
      'North-East',
    ];

    return directions[index];
  }

  displayWeather(weather: CurrentWeather | null | undefined): string {
    if (!weather) return '-';

    const temperature = Math.round(weather.main.temp);
    const condition = capitalize(weather.weather[0].description);

    return `${condition}, ${temperature}°C`;
  }

  onSave(): void {
    this.locationsStore.dispatch(storeNewLocation());
  }

  ngOnInit(): void {
    this.startGeolocationWatch();
    this.startDeviceOrientationWatch();
  }

  ngOnDestroy(): void {
    this.stopGeolocationWatch();
    this.stopDeviceOrientationWatch();
    this.addNewLocationStore.dispatch(resetStore());
  }
}
