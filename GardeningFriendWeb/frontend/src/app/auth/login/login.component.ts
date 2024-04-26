import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResData } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loginForm!: FormGroup;
token: string = '';
error: string = '';
succes: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (data: AuthResData) => {
        this.token = data?.token ?? '';
        this.router.navigate(['/']);
      },
      error: (errorRes) => {
        this.error = errorRes;
        alert(errorRes);
      },
    });
    this.loginForm.reset();
}

}
















//  user: User = {
//    id: 0,
//    username: '',
//    name: '',
//    email: '',
//    birth_date: '',
//    password: ''
//  };

//  loginForm = this.formBuilder.group({
//    email: ["", [Validators.required, Validators.email]],
//    password: ["", [Validators.required, Validators.minLength(8)]],
//  })

//  constructor(private formBuilder: FormBuilder, private router: Router) { }

//  ngOnInit(): void { }

//  get email() {
 //   return this.loginForm.controls.email;
//  }
//  get password() {
//    return this.loginForm.controls.password;
//  }

  // onSubmit(event: Event, usuario: User) : void{
  //   if (this.loginForm.valid) {
  //     console.log("Llamar al servicio de login");
  //     event.preventDefault;
  //     this.authService.login(this.user)
  //     .subscribe(
  //       data => {
  //         console.log("DATA"+ JSON.stringify( data));   
  //         this.router.navigate(['/home']);
  //       }
  //     );
      
  //   }
  //   else {
  //     this.loginForm.markAllAsTouched();
  //   }
  // }

