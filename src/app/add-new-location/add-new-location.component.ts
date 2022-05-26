import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { resetStore, setCurrentLocation } from './add-new-location.actions';
import { locationSelector } from './add-new-location.selectors';
import { AddNewLocationState } from './add-new-location.state';

@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.css'],
})
export class AddNewLocationComponent implements OnInit {
  private geoLocationWatch: number | undefined;

  location$: Observable<GeolocationPosition | undefined>;

  constructor(private store: Store<AddNewLocationState>) {
    this.location$ = store.select(locationSelector);
  }

  private startGeolocationWatch(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    this.geoLocationWatch = navigator.geolocation.watchPosition(
      (location) => this.store.dispatch(setCurrentLocation({ location })),
      (err) => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      },
      options
    );
  }

  private stopGeolocationWatch(): void {
    if (this.geoLocationWatch) {
      navigator.geolocation.clearWatch(this.geoLocationWatch);
    }
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

  ngOnInit(): void {
    this.startGeolocationWatch();
  }

  ngOnDestroy(): void {
    this.stopGeolocationWatch();
    this.store.dispatch(resetStore());
  }
}
