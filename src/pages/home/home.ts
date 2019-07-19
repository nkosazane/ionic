import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OpenWeatherProvider } from '../../providers/open-weather/open-weather';
import 'rxjs/add/operator/catch';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 backgroundImage :string= 'chooseImage(weatherData?.main.temp)';
  
  weatherData : any ;
  cities = [
    "Nelspruit",
    "Pretoria",
    "Cape Town",
    "Polokwane"
  ];
  list;
  city : string;
  dateObj: number = Date.now()
  searchedCity : string = "";
  date = new Date();
  myDate: String = new Date(this.date.getTime()- 
                 this.date.getTimezoneOffset()*60000).toISOString()

  constructor(public openWeather : OpenWeatherProvider, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.city = this.cities[0];
    this.retrieve();
   
  }

  doRefresh(refresher){
    this.searchedCity = "";
    this.city = this.cities[0];
    this.openWeather.updateWeather(this.city).subscribe(
      data =>{
        this.weatherData = data;
        refresher.complete();
        console.log(data);
        this.toast("Weather updated successfully");
        
      },
      error => {
        this.toast("failed to refresh, please try again");
      }
    );
  }
  retrieve(){
    this.openWeather.updateWeather(this.city).subscribe(
      data =>{
        this.weatherData = data;
        console.log(data);
      },
      error => {
        this.toast("the city you have entered is invalid");
        this.city = this.cities[0];

      }
    );
  }

  searchCity(){
    this.openWeather.updateWeather(this.city).subscribe(
      data =>{
        this.weatherData = data;
        if(this.cities.indexOf(this.searchedCity) === -1 ){
          this.searchedCity = this.searchedCity.replace(/^\w/, c => c.toUpperCase());
          this.cities.push(this.searchedCity);
          this.city = this.searchedCity;
          this.searchedCity = "";
          console.log(data);
        }
      },
      error => {

        this.toast("the city you have entered is invalid");
        this.city = this.cities[0];
        this.retrieve();

      }
    );
  }

  cityUpdate(){
    this.retrieve();
  }

  onInput(event){
    if(this.searchedCity.length > 0){
      this.city = this.searchedCity;
      this.searchCity();
    }
  }

  toast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      this.searchedCity = "";
    });
  
    toast.present();
  }


}
