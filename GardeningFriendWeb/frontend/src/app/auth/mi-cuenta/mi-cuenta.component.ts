import { Component } from '@angular/core';
import { User } from '../user.model';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { miCuenta } from 'src/app/services/miCuenta.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss']
})
export class MiCuentaComponent {

  perfil: any={}; 
  constructor(private servicio:miCuenta,private activatedRouter: ActivatedRoute,private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }
   id = this.activatedRouter.snapshot.params['id'];
  ngOnInit() {
    this.servicio.getPerfil(1).subscribe(dato=>{
      this.perfil=dato;
      console.log("funciona desde el ngonInit  "+this.perfil.nombre);
      console.log("funciona desde el ngonInit  "+this.perfil.correo);
      
    });
    
  }
}
  // constructor(private formBuilder: FormBuilder, private router: Router) {}

  // ngOnInit() {
    // this.usersService.getUsers().subscribe((data: User[]) => {
    //   this.myUser = data;
    //   console.log("Mi cuenta user:", this.myUser);
    // })

    // this.userForm = this.formBuilder.group({
    //   username: ['', [Validators.required, Validators.minLength(4)]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    //   confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   birth_date: ['', Validators.required]
    // });

  // }

  // passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  //   const password = this.userForm?.get('password')?.value;
  //   const confirmPassword = control.value;

  //   if (password !== confirmPassword) {
  //     return { 'passwordMismatch': true };
  //   }

  //   return null;
  // };

  // onSubmit(event: Event, user: User) {
  //   if (this.userForm.valid) {
  //     console.log(this.userForm.value);
  //     this.router.navigateByUrl('');
  //     this.usersService.updateUser(user).subscribe(
  //       data => {
  //         console.log(data.id);
  //       })
  //     this.userForm.reset();
  //   } else {
  //     this.userForm.markAllAsTouched();
  //   }
  // }

  // updateUser() {
  //   if (this.user) {
  //     this.usersService.updateUser(this.user).subscribe(
  //       updatedUser => console.log('User updated:', updatedUser),
  //       error => console.log('Error updating user:', error)
  //     );
  //   }
  // }
// }
