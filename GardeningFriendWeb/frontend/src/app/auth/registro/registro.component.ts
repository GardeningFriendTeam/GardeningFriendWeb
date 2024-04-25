import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
// import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
// export class RegistroComponent implements OnInit{
//   userForm!: FormGroup;
//   user: User = {
//     id: 0,
//     username: '',
//     name: '',
//     email: '',
//     birth_date: '',
//     password: '',
//   };

//   constructor(private formBuilder: FormBuilder, private router: Router) {}

//   ngOnInit() {
//     this.userForm = this.formBuilder.group({
//       username: ['', [Validators.required, Validators.minLength(4)]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       birth_date: ['', Validators.required]
//     }) as FormGroup; // Utilizamos el operador de aserción de tipo para indicar que userForm es de tipo FormGroup
//   }
  

//   passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
//     const password = this.userForm?.get('password')?.value;
//     const confirmPassword = control.value;

//     if (password !== confirmPassword) {
//       return { 'passwordMismatch': true };
//     }

//     return null;
//   };

  // onSubmit(event: Event): void {
  //   event.preventDefault();
  
  //   if (this.userForm.valid) {
  //     this.authService.register(this.userForm.value).subscribe(
  //       (response) => {
  //         console.log('Registro exitoso:', response);
  //         alert('Registro exitoso');
  //         this.router.navigateByUrl('/login'); // Redirect to login page after successful registration
  //       },
  //       (error) => {
  //         console.log('Error en el registro:', error);
  //         alert('Error en el registro');
  //         // Handle registration error
  //       }
  //     );
  //     this.userForm.reset();
  //   } else {
  //     this.userForm.markAllAsTouched();
  //   }
  // }
  

  // onSubmit(event: Event, user:User):void {
  //   event.preventDefault();

  //   if (this.userForm.valid) {
  //     //console.log(this.userForm.value);
  //     console.log("Enviando  al servidor...");
  //     console.log(user);
  //     alert(user);
  //     this.usersService.registerUser(user)
  //     .subscribe(
  //       (response) => {
  //         console.log('Registro exitoso:', response);
  //         alert(user);
  //         // Realiza las acciones correspondientes después de un registro exitoso
  //       },
  //       (error) => {
  //         console.error('Error en el registro:', error);
  //         alert(user);
  //         // Realiza las acciones correspondientes en caso de error en el registro
  //       }
  //   );
  //     //this.router.navigateByUrl('');
  //     //this.userForm.reset();
  //   } else {
  //     this.userForm.markAllAsTouched();
  //   }
  // }

//   get Mail(){
//     return this.userForm.get("email");
//   }
//   get Password(){
//     return this.userForm.get("password");
//   }
//   get Password2(){
//     return this.userForm.get("confirmPassword");
//   }
//   get Nombre(){
//     return this.userForm.get("name");
//   }
//   get Username(){
//     return this.userForm.get("username");
//   }
// }

export class RegistroComponent {
  user = {
    nombre: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.user.confirm_password = '';
    this.http.post('http://localhost:8000/crear-usuario/', this.user).subscribe(
      response => {
        console.log('Usuario creado exitosamente', response);
      },
      error => {
        console.error('Error al crear el usuario', error);
      }
    );
  }
}
