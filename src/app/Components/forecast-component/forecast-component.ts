import { Component, input } from '@angular/core';
import { SingleHourComponent } from './single-hour-component/single-hour-component';
import { HourComponentModel } from '../../DataModel/HourComponentModel';
@Component({
  selector: 'app-forecast-component',
  imports: [SingleHourComponent],
  templateUrl: './forecast-component.html',
  styleUrl: './forecast-component.css',
})
export class ForecastComponent {
  weatherData = input.required<HourComponentModel[]>();
  condition = input.required<string>();
  windSpeed = input.required<string>();
}
