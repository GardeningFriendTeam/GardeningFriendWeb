import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-administrar-usuario',
    styleUrls: ['./administrar-usuario.component.scss'],
    templateUrl: './administrar-usuario.component.html'
})
export class AdministrarUsuarioComponent implements OnInit{ 
    users: User[] = [];
    selectedUser: User | null = null;
    selectedRole: string = 'user';
    showModal: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getUsers().subscribe((data: User[]) => {
          this.users = data;
          console.log(this.users);  
        });
    }

    openRoleModal(user: User): void {
      this.selectedUser = user;
      this.selectedRole = user.is_admin ? 'admin' : 'user';
      this.showModal = true;
  }

  closeRoleModal(): void {
      this.showModal = false;
  }

  updateRole(): void {
      if (this.selectedUser) {
          const isAdmin = this.selectedRole === 'admin';
          this.authService.updateUserRole(this.selectedUser.id, isAdmin).subscribe(() => {
              this.selectedUser!.is_admin = isAdmin;
              this.showModal = false;
          });
      }
  }

  // Dentro de AdministrarUsuarioComponent
deleteUser(userId: number): void {
  this.authService.deleteUser(userId).subscribe(
    response => {
      console.log(response);
      // Actualiza la lista de usuarios si es necesario
      this.authService.getUsers().subscribe((updatedUsers: User[]) => {
        this.users = updatedUsers.filter(u => u.id!== userId);
      });
    },
    error => {
      console.error(error);
    }
  );
}



}
