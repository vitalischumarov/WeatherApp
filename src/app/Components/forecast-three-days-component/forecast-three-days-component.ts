import { Component, input } from '@angular/core';
import { SingleDayComponent } from './single-day-component/single-day-component';
import { ThreeDaysForecastModel } from '../../DataModel/ThreeDaysForecastModel';

@Component({
  selector: 'app-forecast-three-days-component',
  imports: [SingleDayComponent],
  templateUrl: './forecast-three-days-component.html',
  styleUrl: './forecast-three-days-component.css',
})
export class ForecastThreeDaysComponent {
  weatherData = input.required<ThreeDaysForecastModel>();
  
  ngOnInit(){
    console.log('forecastcomponent')
    console.log(this.weatherData())
  }
}
