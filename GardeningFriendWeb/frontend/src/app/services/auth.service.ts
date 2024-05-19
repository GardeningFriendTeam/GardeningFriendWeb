import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../auth/user.model';
import { loginModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject: BehaviorSubject<any>;
  private apiUrl = 'http://localhost:8000'; // URL del backend Django

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
  }

  get userValue(): any {
    return this.userSubject.value;
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, { username, email, password });
  }

  login(usuario: loginModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { usuario })
    .pipe(
      tap(user => {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  is_admin(): boolean {
    const userData: User | null = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    return (userData && userData?.is_admin) ?? false;
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/`);
  }
}