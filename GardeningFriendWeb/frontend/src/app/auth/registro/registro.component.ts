import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, FormGroup, ValidatorFn, Validators, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
// import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-registro',
//   templateUrl: './registro.component.html',
//   styleUrls: ['./registro.component.scss']
// })


// export class RegistroComponent {
//   user = {
//     nombre: '',
//     email: '',
//     password: '',
//     confirm_password: ''
//   };

//   constructor(private http: HttpClient) {}

//   onSubmit() {
//     this.user.confirm_password = '';
//     this.http.post('http://localhost:8000/crear-usuario/', this.user).subscribe(
//       response => {
//         console.log('Usuario creado exitosamente', response);
//       },
//       error => {
//         console.error('Error al crear el usuario', error);
//       }
//     );
//   }
// }

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{
  registerForm!: FormGroup;
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register() {
    if(this.registerForm.valid) {
      const {username, email, password} = this.registerForm.value;
      this.authService.register(this.username, this.email, this.password).subscribe(
        (response) => {
          console.log(response);
          alert("Usuario creado exitosamente");
          // Manejar la respuesta exitosa, por ejemplo, redirigir al usuario a otra página
          this.router.navigate(['/login']); // Redirigir al usuario a la página de login
        },
        (error) => {
          console.error(error);
          alert("Error al crear el usuario");
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
    }
  }
}
