import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CurrentWeather } from './current-weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey: string = '75ad1daba567a8679eb2c0c214f9399f';

  constructor(private http: HttpClient) {}

  getCurrentWeather(longitude: number, latitude: number) {
    return this.http.get<CurrentWeather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`
    );
  }
}
