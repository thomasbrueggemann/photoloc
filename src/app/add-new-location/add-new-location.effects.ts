import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import * as turf from '@turf/turf';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  fetchWeather,
  setCurrentLocation,
  setWeather,
} from './add-new-location.actions';
import { locationSelector } from './add-new-location.selectors';
import { AddNewLocationState } from './add-new-location.state';
import { WeatherService } from './weather/weather.service';

@Injectable()
export class WeatherEffects {
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
      concatLatestFrom(() => this.store.select(locationSelector)),
      switchMap(([action, location]) => {
        // TODO: check if location has moved more then THREADHOLD_METERS, or the last location
        // is older than THRESHOLD_MINUTES

        var from = turf.point([
          location?.coords.longitude || 0,
          location?.coords.latitude || 0,
        ]);

        var to = turf.point([
          action.location.coords.longitude,
          action.location.coords.latitude,
        ]);

        var distance = turf.distance(from, to, { units: 'meters' });
		var time_delta = Math.abs(location?.timestamp || 0 - action.location.timestamp);

        const fetchWeather: boolean = distance > 1000 ||;
        if (fetchWeather) {
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store<AddNewLocationState>
  ) {}
}
