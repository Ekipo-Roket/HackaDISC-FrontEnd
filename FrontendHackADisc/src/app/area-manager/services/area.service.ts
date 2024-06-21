import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/ResponseAPI_Login';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseWorkersArea } from '../interfaces/ResponseWorkersArea';
import { ResponseEvaluations } from '../interfaces/ResponseEvaluations';
import { Stat } from 'src/app/shared/interfaces/ResponseStat';

@Injectable({
  providedIn: 'root'
})
export class AreaService {


  privateUrl = 'http://127.0.0.1:8000/api/';
  UserLogged!: User;
  WorkersArea : ResponseWorkersArea[] = [];
  Evaluations: ResponseEvaluations[] = [];
  UserToEvaluate: ResponseWorkersArea | null = null;

 // Area: string;
  constructor(private AuthService:AuthService, private HttpClient:HttpClient ){
    this.UserLogged = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};
  }


  async getWorkersArea(): Promise<ResponseWorkersArea[]> {
    const workers =  await firstValueFrom(this.HttpClient.get<ResponseWorkersArea[]>(this.privateUrl+ 'workers/area/' + this.UserLogged.area_id));
    return Promise.resolve(workers);
  }

  async getStats(): Promise<Stat[]>{
    const stats = await firstValueFrom(this.HttpClient.get<Stat[]>(this.privateUrl + 'stats'));
    return stats;
  }
  async getEvaluations(){
    const evaluations = await firstValueFrom(this.HttpClient.get<ResponseEvaluations>(this.privateUrl + 'evaluations'));
    return evaluations;
  }

  getUserLogger(): User{
    return this.UserLogged;
  }

  setEvaluationUser(evaluation: ResponseWorkersArea){
    this.UserToEvaluate = evaluation;
  }

  getEvaluationUser(): ResponseWorkersArea | null{
    return this.UserToEvaluate;
  }

}
