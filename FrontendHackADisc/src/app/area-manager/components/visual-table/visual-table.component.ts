import { AuthService } from './../../../shared/services/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';
import { ChangeStatusService } from '../../../shared/services/change-status.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/ResponseAPI_Login';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'area-table',
  templateUrl: './visual-table.component.html',
  styleUrls: ['./visual-table.component.css']
})
export class VisualTableComponent implements OnInit, AfterViewInit{

  lastUpdate: string = "Recientes";

  company: string = '';
  dropdownRadioVisible = false;
  dropDownCardVisible = false;
  Workers: ResponseWorkersArea[] = [];
  activeWorker: ResponseWorkersArea | null = null;
  evaluationUser: ResponseWorkersArea | null = null;

  showModalChange: boolean = false;

  searchQuery: string = '';
  searchResults: ResponseWorkersArea[] = [];

  constructor(private AuthService:AuthService, private AreaService: AreaService, private ChangeStatusService: ChangeStatusService, private router:Router) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.company = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}').area_id : '';
    this.updateWorkers();
    this.search();
  }

  ngAfterViewInit(): void {
    this.AreaService.getWorkersArea().then((workers) => {
      this.Workers = workers;
    });
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
  aproveWorker(id: number){
    this.ChangeStatusService.changeToAproved(id);

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

  evaluationCard(User: ResponseWorkersArea){
    this.AreaService.setEvaluationUser(User);
    this.router.navigateByUrl('/area/evaluations');
  }

  openModalChange(User: ResponseWorkersArea){
    this.showModalChange = true;
    this.evaluationUser = User;
  }

  closeModalChange(){
    this.showModalChange = false;
  }
}
