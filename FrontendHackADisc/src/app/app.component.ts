  import { AfterViewInit, Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { initFlowbite } from 'flowbite';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit, AfterViewInit{

    async ngOnInit(): Promise<void> {
      await this.initializeFlowbite();
    }

    async initializeFlowbite(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        try {
          initFlowbite();

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }

    ngAfterViewInit(): void {
      window.addEventListener('load', ()=>{
        initFlowbite();
      });
    }
  }
