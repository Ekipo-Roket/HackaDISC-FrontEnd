import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseLOGIN, User } from '../interfaces/ResponseAPI_Login';
import { TokenService } from './token.service';
import { Router } from '@angular/router';


export interface Role {
  id:         number;
  name_rol:   string;
  created_at: null;
  updated_at: null;
}

export interface Area{
  id:         number;
  area_name:  string;
  created_at: null;
  updated_at: null;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TokenService= inject(TokenService);
  private baseUrl = 'http://127.0.0.1:8000/api/';
  public UserLogged!: User;

  constructor(private http: HttpClient, private router: Router) {}

  async login(form: any): Promise<ResponseLOGIN> {
    try {
      const data = await firstValueFrom(this.http.post<ResponseLOGIN>(
        this.baseUrl + 'login',
        JSON.stringify(form.value),
        { headers: { 'Content-Type': 'application/json' } }
      ));

      if (data.user) {
        this.UserLogged = data.user;
        localStorage.setItem('UserLogged', JSON.stringify(this.UserLogged));
      }
      const roleData = await firstValueFrom(
        this.http.get<Role[]>(this.baseUrl + 'role/' + this.UserLogged.role_id)
      );


      console.log('RoleData', roleData);
      console.log('RoleData', roleData[0].name_rol);
      const user = this.UserLogged;
      user.role_name = roleData[0].name_rol;

      const areaData = await firstValueFrom(this.http.get<Area[]>(this.baseUrl + 'area/' + this.UserLogged.area_id));
      console.log('AreaData', areaData);
      user.area_name = areaData[0].area_name;

      localStorage.setItem('UserLogged', JSON.stringify(user));

      if (roleData[0].name_rol === 'Administrador') {
        this.router.navigate(['/admin/dashboard']);
      } else if (roleData[0].name_rol === 'Jefe') {
        this.router.navigate(['/area/dashboard']);
      } else if (roleData[0].name_rol === 'Gerente') {
        this.router.navigate(['/business/dashboard']);
      } else {
        this.router.navigate(['/']);
      }

      return data;
    } catch (error: any) {
      console.error('Error en el login', error);
      return Promise.reject(error);
    }
  }

}
