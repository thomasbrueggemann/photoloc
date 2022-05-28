import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import * as turf from '@turf/turf';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  dontFetchWeather,
  fetchWeather,
  setCurrentLocation,
  setWeather,
  storeNewLocation,
} from './add-new-location.actions';
import { lastWeatherLocationSelector, locationSelector, weatherSelector } from './add-new-location.selectors';
import { AddNewLocationState } from './add-new-location.state';
import { WeatherService } from './weather/weather.service';
import { Location } from '../locations/location';
import { addLocation } from '../locations/locations.actions';
import { capitalize } from '../utils';

@Injectable()
export class AddNewLocationEffects {
  fetchCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWeather),
      switchMap((props) =>
        this.weatherService
          .getCurrentWeather(
            props.location.coords.longitude,
            props.location.coords.latitude
          )
          .pipe(
            map((weather) => setWeather({ weather })),
            catchError(() => EMPTY)
          )
      )
    )
  );

  triggerWeatherFetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCurrentLocation),
      concatLatestFrom(() => this.addNewLocationStore.select(lastWeatherLocationSelector)),
      map(([action, lastWeatherLocation]) => {

        if (!lastWeatherLocation) {
          return fetchWeather({ location: action.location });
        }

        var from = turf.point([
          lastWeatherLocation?.coords.longitude || 0,
          lastWeatherLocation?.coords.latitude || 0,
        ]);

        var to = turf.point([
          action.location.coords.longitude,
          action.location.coords.latitude,
        ]);

        var distance = turf.distance(from, to, { units: 'meters' });
        var time_delta = Math.abs(lastWeatherLocation?.timestamp || 0 - action.location.timestamp);

        const shouldFetchWeather: boolean = (distance > 1000 || time_delta > 1000 * 60 * 5) && action.location.coords.accuracy < 1000;
        if (shouldFetchWeather) {
          return fetchWeather({ location: action.location });
        }

        return dontFetchWeather();
      })
    ));

  storeNewLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeNewLocation),
      concatLatestFrom(() => [this.addNewLocationStore.select(weatherSelector), this.addNewLocationStore.select(locationSelector)]),
      map(([, weather, location]) => {

        const newLocation: Location = {
          id: self.crypto.randomUUID(),
          coords: {
            longitude: location?.coords.longitude || 0,
            latitude: location?.coords.latitude || 0,
          },
          timestamp: location?.timestamp || 0,
          heading: location?.coords.heading || 0,
          weather: undefined
        };

        if (weather) {
          newLocation.weather = {
            condition: capitalize(weather?.weather[0].description),
            temperature: weather?.main.temp || 0,
          };
        }

        return addLocation({ location: newLocation });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private addNewLocationStore: Store<AddNewLocationState>
  ) { }
}

