import { Component } from '@angular/core';
import { SingleDayComponent } from './single-day-component/single-day-component';

@Component({
  selector: 'app-forecast-three-days-component',
  imports: [SingleDayComponent],
  templateUrl: './forecast-three-days-component.html',
  styleUrl: './forecast-three-days-component.css',
})
export class ForecastThreeDaysComponent {

}
