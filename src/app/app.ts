import { Component, OnInit, signal } from '@angular/core';
import { NavComponent } from './Components/nav-component/nav-component';
import { MainComponent } from './Components/main-component/main-component';
import { ForecastComponent } from './Components/forecast-component/forecast-component';
import { ForecastThreeDaysComponent } from './Components/forecast-three-days-component/forecast-three-days-component';
import { DetailBoxComponent } from './Components/detail-box-component/detail-box-component';
import { ApiService } from './Services/ApiService';
import { TimeService } from './Services/TimeService';
import { MainComponentModel } from './DataModel/MainComponentModel';
import { ThreeDaysForecastModel } from './DataModel/ThreeDaysForecastModel';
import { DetailComponentModel } from './DataModel/DetailComponentModel';
import { HourComponentModel } from './DataModel/HourComponentModel';

@Component({
  selector: 'app-root',
  imports: [NavComponent, MainComponent, ForecastComponent, ForecastThreeDaysComponent, DetailBoxComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('WeatherApp');

  private _apiService: ApiService;
  private _timeService: TimeService;

  constructor(apiService: ApiService, timeService: TimeService){
    this._apiService = apiService;
    this._timeService = timeService;
  }

  mainComponentData: MainComponentModel = new MainComponentModel();
  threeDaysForecastData: ThreeDaysForecastModel = new ThreeDaysForecastModel();
  detailComponentData: DetailComponentModel = new DetailComponentModel();
  hourComponentData: HourComponentModel = {
  windSpeed: '',
  timeIntervall: [],
  temperatureIntervall: [],
};


  maxTemp: string = ''
  maxWind: string = ''
 
  async ngOnInit(){
    let data = await this._apiService.loadWeatherData("Unteriberg")
    this.mainComponentData.cityName = data.location.name;
    this.mainComponentData.temperature = data.current.temp_c;
    this.mainComponentData.condition = data.current.condition.text;

    this.threeDaysForecastData.temperatureOne = data.forecast.forecastday[0].day.maxtemp_c;
    this.threeDaysForecastData.temperatureTwo = data.forecast.forecastday[1].day.maxtemp_c;
    this.threeDaysForecastData.temperatureThree = data.forecast.forecastday[2].day.maxtemp_c;
    this.threeDaysForecastData.windSpeedOne = data.forecast.forecastday[0].day.maxwind_kph;
    this.threeDaysForecastData.windSpeedTwo = data.forecast.forecastday[1].day.maxwind_kph;
    this.threeDaysForecastData.windSpeedThree = data.forecast.forecastday[2].day.maxwind_kph;

    this.detailComponentData.humididy = data.current.humidity;
    this.detailComponentData.feelsLike = data.current.feelslike_c;
    this.detailComponentData.sunrise = data.forecast.forecastday[0].astro.sunrise;
    this.detailComponentData.sunset = data.forecast.forecastday[0].astro.sunset;

    let counter: number = 0
    let daySelector: number = 0
    for (let i = this._timeService.getCurrentTime(); i < 25; i++){
      if (counter < 24) {
        if (i === 24) {
          console.log('daySelector: '+ daySelector)
          daySelector++;
          i = 0;
        }
        console.log("time is: "+ i)
        console.log(data.forecast.forecastday[daySelector].hour[i].temp_c)
        this.hourComponentData.timeIntervall[counter] = String(i);
        this.hourComponentData.temperatureIntervall[i] = String(data.forecast.forecastday[daySelector].hour[i].temp_c)
        counter++;
        console.log('counter: '+counter)
      }
    }
    console.log(this.hourComponentData)
  }
}
