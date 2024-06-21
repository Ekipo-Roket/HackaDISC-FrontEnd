import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseLOGIN, User } from '../interfaces/ResponseAPI_Login';
import { TokenService } from './token.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChangeStatusService {

  TokenService= inject(TokenService);
  private baseUrl = 'http://127.0.0.1:8000/api/';
  public UserLogged!: User;

  constructor(private http: HttpClient, private router: Router) { }


  changeToInIntervention(id: number){
    this.http.post<ResponseLOGIN>(this.baseUrl + 'workers/change-status/in-intervention/' + id, {}).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/intervention']);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  changeToAproved(id: number){
    console.log(id);
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
