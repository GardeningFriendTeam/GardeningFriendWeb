import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { AuthResData, loginModel } from '../models/auth.model';
import { Observable, throwError } from 'rxjs';

const loginUrl = 'http://localhost:8000/api/login/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credenciales: loginModel): Observable<AuthResData> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<AuthResData>(loginUrl, credenciales, httpOptions)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('access_token', response.token);
            return response;
          } else {
            throw new Error('Credenciales de inicio de sesión inválidas');
          }
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Se produjo un error: ' + error.error.message;
    } else {
      errorMessage = `El backend devolvió el código ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token); 
      if (!decodedToken || !decodedToken.exp) {
        return false; 
      }
      const expirationDate: Date = new Date(decodedToken.exp * 1000); 
      return expirationDate.valueOf() > Date.now(); 
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return false; 
    }
  }
}
