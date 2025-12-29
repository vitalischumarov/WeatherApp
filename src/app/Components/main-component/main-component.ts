import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-component',
  imports: [],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {

  cityName = input<string>('no city')
  temperature = input<string>('no temperature')
  condition = input<string>('no condition')
}
