import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResData, loginModel } from 'src/app/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: loginModel = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({ // Inicializa loginForm utilizando FormBuilder
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void { }

  onSubmit() {
    this.authService.login(this.user)
      .subscribe(
        (response) => {
          // Iniciar sesión en la aplicación o navegar a la página protegida
          console.log('Inicio de sesión exitoso!');
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }
}
