import { Component, signal } from '@angular/core';
import { NavComponent } from './Components/nav-component/nav-component';
import { MainComponent } from './Components/main-component/main-component';

@Component({
  selector: 'app-root',
  imports: [NavComponent, MainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WeatherApp');
}
