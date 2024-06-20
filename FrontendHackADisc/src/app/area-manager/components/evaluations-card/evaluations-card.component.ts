import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces/ResponseAPI_Login';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';

@Component({
  selector: 'area-evaluations-card',
  templateUrl: './evaluations-card.component.html',
  styleUrls: ['./evaluations-card.component.css']
})
export class EvaluationsCardComponent {

  @Input() User! : ResponseWorkersArea;

  constructor() {

  }

}
