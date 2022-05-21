import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';
import { setLocation } from './add-new-location.actions';
import { AddNewLocationState } from './add-new-location.state';

@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.css'],
})
export class AddNewLocationComponent implements OnInit {
  private geoLocationWatch: number | undefined;

  location$: Observable<GeolocationPosition | undefined>;

  constructor(
    private weatherService: WeatherService,
    private store: Store<AddNewLocationState>
  ) {
    this.location$ = store.select('location');
  }

  private startGeolocationWatch(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    this.geoLocationWatch = navigator.geolocation.watchPosition(
      (location) => this.store.dispatch(setLocation({ location })),
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

  ngOnInit(): void {
    this.weatherService.getCurrentWeather(7, 51).subscribe((data) => {
      console.log(data);
    });

    this.startGeolocationWatch();
  }

  ngOnDestroy(): void {
    this.stopGeolocationWatch();
  }
}
