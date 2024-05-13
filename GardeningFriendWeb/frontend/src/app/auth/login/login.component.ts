import { Component } from '@angular/core';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        response => {
          console.log(response);
          // Manejar la respuesta exitosa, por ejemplo, redirigir al usuario a otra página
          console.log(this.username);
        },
        error => {
          console.error(error);
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
  }
}


// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { User } from '../user.model';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   user: User = {
//     id: 0,
//     username: '',
//     name: '',
//     email: '',
//     birth_date: '',
//     password: ''
//   };

//   loginForm = this.formBuilder.group({
//     email: ["", [Validators.required, Validators.email]],
//     password: ["", [Validators.required, Validators.minLength(8)]],
//   })

//   constructor(private formBuilder: FormBuilder, private router: Router) { }

//   ngOnInit(): void { }

//   get email() {
//     return this.loginForm.controls.email;
//   }
//   get password() {
//     return this.loginForm.controls.password;
//   }

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../../services/authService';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';

//   constructor(private http: HttpClient) {}

//   onSubmit() {
//     this.http.post<any>('http://localhost:8000/login/', {
//     email: this.email,
//     password: this.password
//   }).subscribe(
//       response => {
//         console.log('Inicio de sesión exitoso', response);
//         // Manejar redirección o acciones posteriores al inicio de sesión exitoso
//       },
//       error => {
//         console.error('Error al iniciar sesión', error);
//         // Manejar errores de inicio de sesión
//       }
//     );
//   }
// }

// export class LoginComponent {

//   username: string = '';
//   password: string = '';

//   constructor(private http: HttpClient) {}

  // login() {
  //   this.http.post<any>('http://localhost:8000/login/', { username: this.username, password: this.password })
  //     .subscribe(
  //       response => {
  //         // Manejar la respuesta exitosa
  //         console.log(response);
  //       },
  //       error => {
  //         // Manejar el error
  //         console.error(error);
  //       }
  //     );

  //   this.http.post('http://localhost:8000/login/', this.user).subscribe(
  //     response => {
  //       console.log('Inicio de sesión exitoso', response);
  //       // Manejar redirección o acciones posteriores al inicio de sesión exitoso
  //     },
  //     error => {
  //       console.error('Error al iniciar sesión', error);
  //       // Manejar errores de inicio de sesión
  //     }
  //   );
  // }

//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService) {}

//   login() {
//     this.authService.login(this.email, this.password)
//       .subscribe(
//         response => {
//           // Manejar la respuesta exitosa, por ejemplo, almacenar el token en el almacenamiento local
//           console.log(response);
//         },
//         error => {
//           // Manejar el error
//           console.error(error);
//         }
//       );
//   }
// }





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
// }
