import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseLOGIN, User } from '../interfaces/ResponseAPI_Login';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { ResponseWorkersArea } from 'src/app/area-manager/interfaces/ResponseWorkersArea';


@Injectable({
  providedIn: 'root'
})
export class ChangeStatusService {

  TokenService= inject(TokenService);
  private baseUrl = 'http://127.0.0.1:8000/api/';
  public UserLogged!: User;

  constructor(private http: HttpClient, private router: Router) { }


  changeToInIntervention(User: ResponseWorkersArea){
    const id = User.id;
    this.http.post<ResponseLOGIN>(this.baseUrl + 'workers/change-status/in-intervention/' + id, {}).subscribe(
      (res) => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  changeToAproved(User: ResponseWorkersArea){
    const id = User.id;
    this.http.post<ResponseLOGIN>(this.baseUrl + `workers/change-status/intervened/${id}`, {}).subscribe(
      (res) => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
