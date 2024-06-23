import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../../shared/interfaces/ResponseAPI_Login';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit{

  User!: ResponseWorkersArea | null;

  constructor(private areaService: AreaService) {
    scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.areaService.userToEvaluate$.subscribe(user => {
      this.User = user;
    });
  }
}
