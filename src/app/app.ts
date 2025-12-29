import { Component, OnInit, signal } from '@angular/core';
import { NavComponent } from './Components/nav-component/nav-component';
import { MainComponent } from './Components/main-component/main-component';
import { ForecastComponent } from './Components/forecast-component/forecast-component';
import { ForecastThreeDaysComponent } from './Components/forecast-three-days-component/forecast-three-days-component';
import { DetailBoxComponent } from './Components/detail-box-component/detail-box-component';
import { ApiService } from './Services/ApiService';
import { MainComponentModel } from './DataModel/MainComponentModel';
import { ThreeDaysForecastModel } from './DataModel/ThreeDaysForecastModel';

@Component({
  selector: 'app-root',
  imports: [NavComponent, MainComponent, ForecastComponent, ForecastThreeDaysComponent, DetailBoxComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('WeatherApp');

  private _apiService: ApiService;

  constructor(apiService: ApiService){
    this._apiService = apiService;
  }

  mainComponentData: MainComponentModel = new MainComponentModel();
  threeDaysForecastData: ThreeDaysForecastModel = new ThreeDaysForecastModel();


  maxTemp: string = ''
  maxWind: string = ''
 
  async ngOnInit(){
    let data = await this._apiService.loadWeatherData("Regensberg")
    this.mainComponentData.cityName = data.location.name;
    this.mainComponentData.temperature = data.current.temp_c;
    this.mainComponentData.condition = data.current.condition.text;

    this.threeDaysForecastData.temperatureOne = data.forecast.forecastday[0].day.maxtemp_c;
    this.threeDaysForecastData.temperatureTwo = data.forecast.forecastday[1].day.maxtemp_c;
    this.threeDaysForecastData.temperatureThree = data.forecast.forecastday[2].day.maxtemp_c;
    this.threeDaysForecastData.windSpeedOne = data.forecast.forecastday[0].day.maxwind_kph;
    this.threeDaysForecastData.windSpeedTwo = data.forecast.forecastday[1].day.maxwind_kph;
    this.threeDaysForecastData.windSpeedThree = data.forecast.forecastday[2].day.maxwind_kph;
  }
}
