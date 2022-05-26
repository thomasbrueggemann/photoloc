import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import * as turf from '@turf/turf';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import {
  dontFetchWeather,
  fetchWeather,
  setCurrentLocation,
  setWeather,
} from './add-new-location.actions';
import { lastWeatherLocationSelector } from './add-new-location.selectors';
import { AddNewLocationState } from './add-new-location.state';
import { WeatherService } from './weather/weather.service';

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
      exhaustMap(action =>
        this.store.select(lastWeatherLocationSelector).pipe(
          map(lastWeatherLocation => {

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
        )
      )
    ));

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store<AddNewLocationState>
  ) { }
}
