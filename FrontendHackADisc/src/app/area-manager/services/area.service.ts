// src/app/services/area.service.ts
import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/ResponseAPI_Login';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { ResponseWorkersArea } from '../interfaces/ResponseWorkersArea';
import { ResponseEvaluations } from '../interfaces/ResponseEvaluations';
import { Stat } from 'src/app/shared/interfaces/ResponseStat';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private privateUrl = 'http://127.0.0.1:8000/api/';
  private userToEvaluateSubject: BehaviorSubject<ResponseWorkersArea | null> = new BehaviorSubject<ResponseWorkersArea | null>(null);
  public userToEvaluate$: Observable<ResponseWorkersArea | null> = this.userToEvaluateSubject.asObservable();

  UserLogged!: User;
  WorkersArea: ResponseWorkersArea[] = [];
  Evaluations: ResponseEvaluations[] = [];

  constructor(private AuthService: AuthService, private HttpClient: HttpClient) {
    this.UserLogged = localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};
  }

  async getWorkersArea(): Promise<ResponseWorkersArea[]> {
    const workers = await firstValueFrom(this.HttpClient.get<ResponseWorkersArea[]>(this.privateUrl + 'workers/area/' + this.UserLogged.area_id));
    return Promise.resolve(workers);
  }

  async getStats(): Promise<Stat[]> {
    const stats = await firstValueFrom(this.HttpClient.get<Stat[]>(this.privateUrl + 'stats'));
    return stats;
  }

  async getEvaluations() {
    const evaluations = await firstValueFrom(this.HttpClient.get<ResponseEvaluations>(this.privateUrl + 'evaluations'));
    return evaluations;
  }

  getUserLogger(): User {
    return this.UserLogged;
  }

  setEvaluationUser(evaluation: ResponseWorkersArea) {
    this.userToEvaluateSubject.next(evaluation);
  }

  getEvaluationUser(): Observable<ResponseWorkersArea | null> {
    return this.userToEvaluate$;
  }
}
