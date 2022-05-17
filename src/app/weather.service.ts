import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CurrentWeather } from './current-weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey: string = '';

  constructor(private http: HttpClient) {}

  getCurrentWeather(longitude: number, latitude: number) {
    return this.http.get<CurrentWeather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`
    );
  }
}
