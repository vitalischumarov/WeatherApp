import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-component',
  imports: [],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent {
  value = input<string>("empty");
  attitude = input<string>('empty');  
}
