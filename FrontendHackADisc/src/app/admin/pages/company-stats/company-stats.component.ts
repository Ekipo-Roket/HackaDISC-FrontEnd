import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { MulticompaniesService } from '../../services/multicompanies.service';
import { ResponseCompany } from '../../interfaces/ResponseCompany';

@Component({
  selector: 'app-company-stats',
  templateUrl: './company-stats.component.html',
  styleUrls: ['./company-stats.component.css']
})
export class CompanyStatsComponent implements OnInit{
  constructor(private route: ActivatedRoute, private companyservice: MulticompaniesService) {
  }

  Company!: ResponseCompany;
  company_id: number = 0;
  ngOnInit(): void {

    this.company_id = this.route.snapshot.params['id'];
    console.log(this.company_id);
    this.getCompany();




  }


  async getCompany(){
    await this.companyservice.getCompany(this.company_id).then((company) => {
      this.Company = company;
    });


  }

}
