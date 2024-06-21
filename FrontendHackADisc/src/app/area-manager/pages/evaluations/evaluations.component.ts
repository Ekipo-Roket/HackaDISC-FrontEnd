import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../../shared/interfaces/ResponseAPI_Login';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit{

  @Output() User!: ResponseWorkersArea;


  constructor() {
    scrollTo(0, 0);
  }

  ngOnInit(): void {

  }
}
