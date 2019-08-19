import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OpenWeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OpenWeatherProvider {

  constructor(public http: HttpClient) {

  }

  updateWeather(city){
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=');
  }

}
