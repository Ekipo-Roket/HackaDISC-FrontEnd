import { Component } from '@angular/core';
import { AuthService } from './../../../shared/services/auth.service';
import { ResponseWorkersArea } from 'src/app/area-manager/interfaces/ResponseWorkersArea';
import { ChangeStatusService } from '../../../shared/services/change-status.service';
import { WorkersService } from '../../services/workers.service';

@Component({
  selector: 'app-visual-table',
  templateUrl: './visual-table.component.html',
  styleUrls: ['./visual-table.component.css']
})
export class VisualTableComponent {

  pageSize = 10;
  currentPage = 1;
  totalItems = 0;

  lastUpdate: string = "Recientes";

  company: string = '';
  dropdownRadioVisible = false;

  dropdownRadio:boolean = false;
  Workers: ResponseWorkersArea[] = [];


  searchQuery: string = '';
  searchResults: ResponseWorkersArea[] = [];

  constructor(private AuthService:AuthService, private WorkersService: WorkersService, private ChangeStatusService: ChangeStatusService) {
    this.ngOnInit();

  }

  ngOnInit(): void {
    this.company = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}').area_id : '';
    this.updateWorkers();

    console.log('Trabajadores', this.Workers);
  }

  get paginatedWorkers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.Workers.slice(startIndex, endIndex);
  }
  setPage(pageNumber: number) {
    console.log('Pagina actual', pageNumber);
    this.currentPage = pageNumber;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pagesArray() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
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


  toggleDropdown() {
    this.dropdownRadioVisible = !this.dropdownRadioVisible;
  }

  updateDate(date: string) {
    this.lastUpdate = date;
    this.dropdownRadioVisible = false;
  }


  updateWorkers(){
    console.log('Actualizando trabajadores');
    this.WorkersService.getWorkers().then((workers) => {
      this.Workers = workers;
      this.totalItems = workers.length;
    });




  }

}
