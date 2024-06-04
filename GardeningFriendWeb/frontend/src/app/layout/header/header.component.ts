import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSub!: Subscription;


  constructor(private authService: AuthService) {
    this.isAuthenticated = !!this.authService.userValue;
  }

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe((userSubject) => {
      this.isAuthenticated = userSubject ? true : false;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
