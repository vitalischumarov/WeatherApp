import { Component, input } from '@angular/core';

@Component({
  selector: 'app-single-day-component',
  imports: [],
  templateUrl: './single-day-component.html',
  styleUrl: './single-day-component.css',
})
export class SingleDayComponent {

  maxTemp = input<string>('no temp');
  maxWindSpeed = input<string>('no speed');
  img = input<string>('no image');
}
