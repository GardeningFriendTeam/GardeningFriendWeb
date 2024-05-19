import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;

  constructor(private authService: AuthService, private router:Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/']);
          //console.log(this.username);
        },
        (error) => {
          console.error(error);
        }
      );
      this.loginForm.reset();
  }
}