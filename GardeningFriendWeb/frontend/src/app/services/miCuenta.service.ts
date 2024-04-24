import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class miCuenta {

API_URL = 'http://127.0.0.1:8000/api/v1perfil/';


  constructor(private http:HttpClient) { }

 public getPerfilList():Observable<any>{
    return this.http.get<any>(this.API_URL);
  }

  public getPerfil(id:number):Observable<any>{
    return this.http.get<any>(this.API_URL+id+"/");
  }

 
  
}