import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseLOGIN, User } from '../interfaces/ResponseAPI_Login';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TokenService= inject(TokenService);
  private baseUrl = 'http://127.0.0.1:8000/api/';
  public UserLogged: User | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  async login (form: any): Promise<ResponseLOGIN>{
    try{
      const data = await firstValueFrom(this.http.post<ResponseLOGIN>(this.baseUrl+'login', form.value, {headers: {'Content-Type': 'application/json'}}));
      if(data.user){
        this.UserLogged = data.user;
      }
      switch(this.UserLogged?.role){
        case 'Gerente':
          this.router.navigateByUrl('/business/dashboard');
          break;
        case 'Jefe':
          this.router.navigateByUrl('/area/dashboard');
          break;
        default:
          this.router.navigateByUrl('/admin/login');
          break;
      }

      return Promise.resolve(data);
    } catch (error:any){
      console.log('Error en el login', error);
      let e = error as HttpErrorResponse
      return Promise.reject(error);
    }
  }
}
