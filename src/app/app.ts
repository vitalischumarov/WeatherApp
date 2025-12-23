import { Component, signal } from '@angular/core';
import { NavComponent } from './Components/nav-component/nav-component';

@Component({
  selector: 'app-root',
  imports: [NavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WeatherApp');
}
