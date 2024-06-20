import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';

@Component({
  selector: 'area-table',
  templateUrl: './visual-table.component.html',
  styleUrls: ['./visual-table.component.css']
})
export class VisualTableComponent implements OnInit{

  lastUpdate: string = "Recientes";

  company: string = '';
  dropdownRadioVisible = false;

  dropdownRadio:boolean = false;
  Workers: ResponseWorkersArea[] = [];

  constructor(private AuthService:AuthService, private AreaService: AreaService) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.company = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}').area_id : '';
    this.updateWorkers();
    this.updateEvaluations();
    console.log('Trabajadores', this.Workers);
  }

  toggleDropdown() {
    this.dropdownRadioVisible = !this.dropdownRadioVisible;
  }

  updateDate(date: string) {
    this.lastUpdate = date;
    this.dropdownRadioVisible = false;
  }


  updateWorkers(){
    console.log('Actualizando trabajadores');
    this.AreaService.getWorkersArea().then((workers) => {
      this.Workers = workers;
    });


  }

  compareStats(recent: number, old: number):number{

    if (recent === old){
      return 0;
    }

    else if (recent < old){
      return -1;
    }

    else{
      return 1
    }

  }

  updateEvaluations(){
    this.AreaService.getEvaluations().then((evaluations) => {
      console.log(evaluations);
    });
  }
}
