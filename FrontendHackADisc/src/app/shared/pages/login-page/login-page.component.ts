import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  forms!: FormGroup;
  error: boolean = false;
  errorMessages: string[] = [];


  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }


  createForm(){
    this.forms = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit(){

    await this.authService.login(this.forms.value);

    return;

  }

  get emailInvalid(){
    return this.forms.get('email')?.invalid && this.forms.get('email')?.touched;
  }

  get passwordInvalid(){
    return this.forms.get('password')?.invalid && this.forms.get('password')?.touched;
  }


}
