import { Component, OnInit } from '@angular/core';
import { AreaManagerService } from '../../services/area-manager.service';
import { ResponseAreaManagers } from '../../interfaces/ResponseAreaManagers';

@Component({
  selector: 'app-visual-table',
  templateUrl: './visual-table.component.html',
  styleUrls: ['./visual-table.component.css']
})
export class VisualTableComponent implements OnInit{
  searchQuery: string = '';
  searchResults: ResponseAreaManagers[] = [];

  AreaManagers: ResponseAreaManagers[] = [];

  pageSize = 10;
  currentPage = 1;
  totalItems = 0;

  constructor(private areaservice: AreaManagerService) { }

  ngOnInit(): void {
    this.getAreaManagers();
    this.totalItems = this.AreaManagers.length;

  }

  getAreaManagers() {
    this.areaservice.getAreaManagers().then((areaManagers) => {
      this.AreaManagers = areaManagers;
      console.log(areaManagers);
    });

  }


  search() {

    if (!this.searchQuery) {
      this.updateManagers();
      return;
    }
    this.searchResults = this.AreaManagers.filter(manager =>
      manager.user_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      manager.user_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.AreaManagers = this.searchResults;
  }

  updateManagers(){
    this.areaservice.getAreaManagers().then((managers) => {
      this.AreaManagers = managers;
      this.totalItems = managers.length;
    });

    console.log('Supervisores', this.AreaManagers);
  }


  get paginatedCompanies() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.AreaManagers.slice(startIndex, endIndex);
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

}
