import { AuthService } from './../../../shared/services/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';
import { ChangeStatusService } from '../../../shared/services/change-status.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/ResponseAPI_Login';
import { Router } from '@angular/router';
import { Stat } from 'src/app/shared/interfaces/ResponseStat';
@Component({
  selector: 'area-table',
  templateUrl: './visual-table.component.html',
  styleUrls: ['./visual-table.component.css']
})
export class VisualTableComponent implements OnInit {

  lastUpdate: string = "Evaluado";

  company: string = '';
  dropdownRadioVisible = false;
  dropDownCardVisible = false;
  Workers: ResponseWorkersArea[] = [];
  WorkersEvaluated: ResponseWorkersArea[] = [];
  WorkersInterventioned: ResponseWorkersArea[] = [];
  WorkersOnInter: ResponseWorkersArea[] = [];

  activeWorker: ResponseWorkersArea | null = null;
  evaluationUser: ResponseWorkersArea | null = null;

  Stats: Stat[] = [];
  showModalChange: boolean = false;

  searchQuery: string = '';
  searchResults: ResponseWorkersArea[] = [];


  criticalWorkersCounter: number = 0;
  warningWorkersCounter: number = 0;


  constructor(private AreaService: AreaService, private ChangeStatusService: ChangeStatusService, private router:Router) {
    this.ngOnInit();

  }

  ngOnInit(): void {
    this.company = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}').area_id : '';
    this.search();
    this.getStats();

    this.updateStat(this.lastUpdate);
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


  dropDownCard(User: ResponseWorkersArea) {
    this.dropDownCardVisible = !this.dropDownCardVisible;
    if (this.activeWorker === User) return;
    this.activeWorker = User;
  }

  toggleDropdown() {
    this.dropdownRadioVisible = !this.dropdownRadioVisible;
  }

  updateStat(stat: string) {
    this.lastUpdate = stat;
    this.dropdownRadioVisible = false;

    if (this.lastUpdate === 'Evaluado') {
      this.Workers = this.WorkersEvaluated;
    } else if (this.lastUpdate === 'En intervencion') {
      this.Workers = this.WorkersOnInter
    } else if (this.lastUpdate === 'Intervenido'){
      this.Workers = this.WorkersInterventioned;
    } else{
      this.updateWorkers();
    }
  }

  async getStats() {

    let newStat:any = []

    await this.AreaService.getStats().then((stats) => {
      newStat = stats;
    });

    this.Stats = newStat[0];

    this.Workers.forEach(worker => {
      if(worker.stat_id === this.Stats[0].id) {
        worker.stat_name = this.Stats[0].name_stat;
        this.WorkersEvaluated.push(worker);
      } else if(worker.stat_id === this.Stats[1].id) {
        worker.stat_name = this.Stats[1].name_stat;
        this.WorkersOnInter.push(worker);
      } else{
        worker.stat_name = this.Stats[2].name_stat;
        this.WorkersInterventioned.push(worker);
      }
    })
  }

  updateWorkers() {
    this.AreaService.getWorkersArea().then((workers) => {
      this.Workers = workers;
    });
    this.Workers.forEach(worker => {
      if(worker.stat_id === 1) {
        worker.stat_name = this.Stats[0].name_stat;
      } else if(worker.stat_id === 2) {
        worker.stat_name = this.Stats[1].name_stat;
      } else{
        worker.stat_name = this.Stats[2].name_stat;
      }
    });
  }

  compareStats(recent: number, old: number): number {
    if (recent === old) return 0;
    else if (recent < old) return -1;
    else return 1;
  }

  aproveWorker(User: ResponseWorkersArea){
    this.ChangeStatusService.changeToAproved(User);
  }


  evaluationCard(User: ResponseWorkersArea) {
    this.AreaService.setEvaluationUser(User);
    this.router.navigateByUrl('/area/evaluations');
  }

  openModalChange(User: ResponseWorkersArea) {
    this.showModalChange = true;
    this.evaluationUser = User;
  }

  closeModalChange() {
    this.showModalChange = false;
  }

  getClassByDate(date: string): string {
    const createdAt = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30); // Convertir a meses

    if (diffMonths > 6) {
      return 'red-background';
    } else if (diffMonths > 4) {
      return 'yellow-background';
    } else {

      return '';
    }
  }
}
