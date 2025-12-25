import { Component, signal } from '@angular/core';
import { NavComponent } from './Components/nav-component/nav-component';
import { MainComponent } from './Components/main-component/main-component';
import { ForecastComponent } from './Components/forecast-component/forecast-component';
import { ForecastThreeDaysComponent } from './Components/forecast-three-days-component/forecast-three-days-component';

@Component({
  selector: 'app-root',
  imports: [NavComponent, MainComponent, ForecastComponent, ForecastThreeDaysComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WeatherApp');
}
