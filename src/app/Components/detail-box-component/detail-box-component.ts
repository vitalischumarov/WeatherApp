import { Component, input } from '@angular/core';
import { CardComponent } from './card-component/card-component';
import { DetailComponentModel } from '../../DataModel/DetailComponentModel';

@Component({
  selector: 'app-detail-box-component',
  imports: [CardComponent],
  templateUrl: './detail-box-component.html',
  styleUrl: './detail-box-component.css',
})
export class DetailBoxComponent {

  weatherData = input<DetailComponentModel>();
}
