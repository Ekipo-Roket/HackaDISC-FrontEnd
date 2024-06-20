import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{


  UserLogged!: any;

  constructor() {
    this.UserLogged =localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};
  }

  ngOnInit(): void {
    this.UserLogged =localStorage.getItem('UserLogged') ? JSON.parse(localStorage.getItem('UserLogged') || '{}') : {};
  }

}
