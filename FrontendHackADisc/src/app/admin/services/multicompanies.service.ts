import { Injectable } from '@angular/core';
import { ResponseMulticompanies } from '../interfaces/ResponseMulticompanies';
import {User} from '../../shared/interfaces/ResponseAPI_Login';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseCompany } from '../interfaces/ResponseCompany';
import { ResponseCompanyStats } from '../interfaces/ResponseCompanyStats';

@Injectable({
  providedIn: 'root'
})
export class MulticompaniesService {

  privateUrl = 'http://127.0.0.1:8000/api/';
  UserLogged!: User;
  ResponseMulticompanies : ResponseMulticompanies[] = [];

  constructor(private AuthService:AuthService, private HttpClient:HttpClient ){
    this.UserLogged = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};

  }

  async getCompanies(): Promise<ResponseMulticompanies[]> {
    const companies =  await firstValueFrom(this.HttpClient.get<ResponseMulticompanies[]>(this.privateUrl+ 'multicompanies' ));
    console.log('compañias', companies);
    return Promise.resolve(companies);

  }
  async getCompany(id: number): Promise<ResponseCompany> {
    const company = await firstValueFrom(this.HttpClient.get<ResponseCompany>(this.privateUrl + 'multicompany/' + id));
    return Promise.resolve(company);
  }

  async getCompanyStats(id: number): Promise<ResponseCompanyStats> {
    // CAMBIAR RUTA, PROVISIONALEMNTE USAR LA RUTA DE EVALUACIONS POR ID DE TRABAJADOR
    const company = await firstValueFrom(this.HttpClient.get<ResponseCompanyStats>(this.privateUrl + `company/stats/${id}`));
    return Promise.resolve(company);
  }

}
