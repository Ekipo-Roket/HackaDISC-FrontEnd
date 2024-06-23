import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseAreaManagers } from '../interfaces/ResponseAreaManagers'
import { firstValueFrom } from 'rxjs';
import { User } from '../../shared/interfaces/ResponseAPI_Login';

@Injectable({
  providedIn: 'root'
})
export class AreaManagerService {

  privateUrl = 'http://127.0.0.1:8000/api/';
  UserLogged!: User;
  company_id = 0;
  AreaManagers: ResponseAreaManagers[] = [];

  constructor(private HttpClient:HttpClient ){
    this.UserLogged = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};

    this.company_id = this.UserLogged.company_id;
  }

  async getAreaManagers(): Promise<ResponseAreaManagers[]>{
    const managers = await firstValueFrom(this.HttpClient.post<ResponseAreaManagers[]>
      (this.privateUrl + 'areaManager/'+this.company_id,
      { headers: { 'Content-Type': 'application/json' } }
    ));
    console.log('Supervisores', this.UserLogged);
    return Promise.resolve(managers);
  }



}
