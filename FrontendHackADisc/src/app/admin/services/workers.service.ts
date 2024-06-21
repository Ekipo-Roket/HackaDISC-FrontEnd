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
export class WorkersService {

  privateUrl = 'http://127.0.0.1:8000/api/';
  UserLogged!: User;
  WorkersArea : ResponseWorkersArea[] = [];
  Evaluations: ResponseEvaluations[] = [];

  constructor(private AuthService:AuthService, private HttpClient:HttpClient ){
    this.UserLogged = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};

  }


  async getWorkers(): Promise<ResponseWorkersArea[]> {
    const workers =  await firstValueFrom(this.HttpClient.get<ResponseWorkersArea[]>(this.privateUrl+ 'workers' ));
    console.log('Trabajadores', workers);
    return Promise.resolve(workers);

  }
  getUserLogger(): User{
    return this.UserLogged;
  }
}
