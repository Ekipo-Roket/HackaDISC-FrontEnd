import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{


  UserLogged!: any;

  constructor(private Router:Router) {
    this.UserLogged =localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};
  }

  ngOnInit(): void {
    this.UserLogged =localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};
  }

  goDashboard(){
    this.Router.navigate(['/area/dashboard']);
  }

  goEvaluation(){
    this.Router.navigate(['/area/evaluations']);
  }

}
