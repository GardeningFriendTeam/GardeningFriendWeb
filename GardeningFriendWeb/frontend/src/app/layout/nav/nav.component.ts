import { Component, OnInit } from '@angular/core';
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
  isAdmin: boolean = false;
  private userSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe((userSubject) => {
      this.isAdmin = userSubject?.is_admin ? true : false;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

 // funcion para cambiar el estado de la v. flag
  desplegarMenu() {
    this.toggleEffect = !this.toggleEffect;
  }
}
