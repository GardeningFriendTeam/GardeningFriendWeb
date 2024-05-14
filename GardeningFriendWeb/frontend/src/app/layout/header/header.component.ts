import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  OnInit {
  isAuthenticated: boolean = false;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  //logout() {
  //  this.authService.logout();
  //}
}
