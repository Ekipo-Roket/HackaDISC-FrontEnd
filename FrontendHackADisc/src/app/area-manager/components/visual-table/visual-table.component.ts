import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/ResponseAPI_Login';

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
  dropDownCardVisible:boolean = false;

  Workers: ResponseWorkersArea[] = [];
  activeWorker: ResponseWorkersArea | null = null;


  searchQuery: string = '';
  searchResults: ResponseWorkersArea[] = [];

  constructor(private AreaService: AreaService) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.company = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}').area_id : '';
    this.updateWorkers();
    this.updateEvaluations();
    this.search();
  }

  search() {

    if (!this.searchQuery) {
      this.updateWorkers();
      return;
    }
    this.searchResults = this.Workers.filter(worker =>
      worker.user_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.Workers = this.searchResults;
  }


  dropDownCard(User: ResponseWorkersArea){
    this.dropDownCardVisible = !this.dropDownCardVisible;

    if (this.activeWorker === User)return;
    this.activeWorker = User;


  }

  toggleDropdown() {
    this.dropdownRadioVisible = !this.dropdownRadioVisible;
  }

  updateDate(date: string) {
    this.lastUpdate = date;
    this.dropdownRadioVisible = false;
  }


  updateWorkers(){
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
