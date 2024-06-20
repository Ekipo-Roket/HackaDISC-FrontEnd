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

  async login(form: any): Promise<ResponseLOGIN> {
    try {
      console.log('Form data:', form.value);
      const data = await firstValueFrom(this.http.post<ResponseLOGIN>(
        this.baseUrl + 'login',
        JSON.stringify(form.value),
        { headers: { 'Content-Type': 'application/json' } }
      ));

      if (data.user) {
        this.UserLogged = data.user;
      }

      console.log('Role:', this.UserLogged?.role);
      if (this.UserLogged?.role === 'Administrador') {
        this.router.navigate(['/admin/dashboard']);
      }
      else if (this.UserLogged?.role === 'Jefe') {
        this.router.navigate(['/area/dashboard']);
      }
      else if (this.UserLogged?.role === 'Gerente') {
        this.router.navigate(['/business/dashboard']);
      }
      else{
        this.router.navigate(['/']);
      }

      return Promise.resolve(data);
    } catch (error: any) {
      console.error('Error en el login', error);
      return Promise.reject(error);
    }
  }

}
