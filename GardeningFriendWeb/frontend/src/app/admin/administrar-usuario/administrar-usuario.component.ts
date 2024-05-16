import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-administrar-usuario',
    styleUrls: ['./administrar-usuario.component.scss'],
    templateUrl: './administrar-usuario.component.html'
})
export class AdministrarUsuarioComponent implements OnInit{ 
    users: User[] = [];

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getUsers().subscribe((data: User[]) => {
          this.users = data;
        });
      }

}
