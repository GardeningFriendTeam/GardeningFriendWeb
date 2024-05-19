import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
 // variable flag
  toggleEffect = false;
  is_admin: boolean = false;
  private userSub!: Subscription;
  adminMenuOpen= false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe((userSubject) => {
      this.is_admin = userSubject?.is_admin ? true : false;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

 // funcion para cambiar el estado de la v. flag
  desplegarMenu() {
    this.toggleEffect = !this.toggleEffect;
  }

  toggleAdminMenu() {
    this.adminMenuOpen = !this.adminMenuOpen;
  }

  goToAdministrarCultivos() {
    this.router.navigate(['/administrar-cultivo'])
  }

  goToAdministrarUsuarios(){
    this.router.navigate(['/administrar-usuario'])
  }
}
