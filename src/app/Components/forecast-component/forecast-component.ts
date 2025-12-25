import { Component } from '@angular/core';
import { SingleHourComponent } from './single-hour-component/single-hour-component';
@Component({
  selector: 'app-forecast-component',
  imports: [SingleHourComponent],
  templateUrl: './forecast-component.html',
  styleUrl: './forecast-component.css',
})
export class ForecastComponent {

}
