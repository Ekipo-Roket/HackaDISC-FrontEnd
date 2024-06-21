import { Component } from '@angular/core';
import { AuthService } from './../../../shared/services/auth.service';
import { ChangeStatusService } from '../../../shared/services/change-status.service';
import { MulticompaniesService } from '../../services/multicompanies.service';
import { ResponseMulticompanies } from '../../interfaces/ResponseMulticompanies';
import { Router } from '@angular/router';

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
  Companies: ResponseMulticompanies[] = [];


  searchQuery: string = '';
  searchResults: ResponseMulticompanies[] = [];

  constructor(private router: Router,private AuthService:AuthService, private MulticompaniesService: MulticompaniesService, private ChangeStatusService: ChangeStatusService) {
    this.ngOnInit();


  }

  ngOnInit(): void {
    this.company = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}').area_id : '';
    this.updateCompanies();
  }

  get paginatedCompanies() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.Companies.slice(startIndex, endIndex);
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
      this.updateCompanies();
      return;
    }
    this.searchResults = this.Companies.filter(company =>
      company.main_company_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      company.sub_company_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.Companies = this.searchResults;
  }

  navigateToCompanyStats(id: number) {
    this.router.navigate(['/admin/company-stats/', id]);
  }



  updateCompanies(){
    this.MulticompaniesService.getCompanies().then((companies) => {
      this.Companies = companies;
      this.totalItems = companies.length;
      this.Companies.sort((a, b) => a.main_company_name.localeCompare(b.main_company_name));
    });

    console.log('Compañias', this.Companies);
  }

}
