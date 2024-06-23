import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  UserLogged!: any;

  constructor( private AuthService:AuthService) {


  }

  ngOnInit(): void {

    this.UserLogged =localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};
  }
}
