import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss']
})
export class MiCuentaComponent implements OnInit, OnDestroy {
  userSubject!: User;
  userSub!: Subscription;
  isEditing = false;
  updatedUsername!: string;
  updatedEmail!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe((data) => {
      this.userSubject = data || {};
      this.updatedUsername = this.userSubject.username;
      this.updatedEmail = this.userSubject.email;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  edit(field: string) {
    this.isEditing = true;
  }

  updateUser() {
    const updatedUser = {
     ...this.userSubject,
      username: this.updatedUsername,
      email: this.updatedEmail
    };
    
    this.authService.updateUser(updatedUser).subscribe(
      (response) => {
        this.refreshUser(); // Forza la actualización del usuario
        this.isEditing = false;
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }

  refreshUser() {
    // Suponiendo que getUser() ahora devuelve un array de usuarios
    this.authService.getUsers().subscribe(users => {
      if (users.length > 0) {
        this.userSubject = users[0]; // Selecciona el primer usuario del array
        this.updatedUsername = this.userSubject.username;
        this.updatedEmail = this.userSubject.email;
      }
    });
  }
  
}
