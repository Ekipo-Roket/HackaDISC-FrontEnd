import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/ResponseAPI_Login';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseWorkersArea } from '../interfaces/ResponseWorkersArea';
import { ResponseEvaluations } from '../interfaces/ResponseEvaluations';

@Injectable({
  providedIn: 'root'
})
export class AreaService {


  privateUrl = 'http://127.0.0.1:8000/api/';
  UserLogged!: User;
  WorkersArea : ResponseWorkersArea[] = [];
  Evaluations: ResponseEvaluations[] = [];

 // Area: string;
  constructor(private AuthService:AuthService, private HttpClient:HttpClient ){
    this.UserLogged = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};

  }

  // async callGetArea(): Promise<string>{
  //   try{
  //     const area = firstValueFrom(await this.HttpClient.get<string>('http://' + this.UserLogged.area_id));


  //   }catch(error: any){
  //     console.error('Error en el area', error);
  //     return '';
  //   }
  // }

  async getWorkersArea(): Promise<ResponseWorkersArea[]> {
    const workers =  await firstValueFrom(this.HttpClient.get<ResponseWorkersArea[]>(this.privateUrl+ 'workers/area/' + this.UserLogged.area_id));

    return Promise.resolve(workers);

  }

  async getEvaluations(){
    const evaluations = await firstValueFrom(this.HttpClient.get<ResponseEvaluations>(this.privateUrl + 'evaluations'));
    return evaluations;
  }

  getUserLogger(): User{
    return this.UserLogged;
  }

}
