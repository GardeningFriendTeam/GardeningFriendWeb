import { Injectable } from '@angular/core';
import { Cultivo } from '../enciclopedia/cultivos/cultivos.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultivosService {

  // API_URL = 'http://127.0.0.1:8000/cultivos/cultivos/';
  API_URL = 'http://127.0.0.1:8000/api/';
  
  cultivoFavorito: Cultivo[] = [];

  addToFavorites(cultivo: Cultivo): boolean {
    const existingFavorite = this.cultivoFavorito.find(favorite => favorite.id === cultivo.id);
  
    if (existingFavorite) {
      existingFavorite.favorito = true;
      return false; // Indica que el cultivo ya esta en favoritos
    }
  
    cultivo.favorito = true;
    this.cultivoFavorito.push(cultivo);
    return true; // Indica que se agrego
  }

  getFavorites() {
    return this.cultivoFavorito;
  }

  constructor(private http:HttpClient) { }

  listCultivos():Observable<Cultivo[]>{
    return this.http.get<Cultivo[]>(this.API_URL +"cultivos/");
  }

  //alta de un cultivo
public create(cultivo:any):Observable<any>{
  return this.http.post(this.API_URL+'cultivos/',cultivo);
} 

public traerCategorias():Observable<any>{
  return this.http.get(this.API_URL+"categoriaCultivo/");

};

public traerCultivos():Observable<any>{
  return this.http.get(this.API_URL +"cultivos/");

};

public detail(Id:number): Observable<any>{
  return this.http.get<any>(this.API_URL + 'cultivos/'+ Id);
};

public detailCat(Id:number): Observable<any>{
  return this.http.get<any>(this.API_URL + 'cultivos?idCategoriaCultivo='+ Id);
};

public categoria(Id:number): Observable<any>{
  return this.http.get<any>(this.API_URL + 'categoriaCultivo/'+ Id);
};

//actualizar producto
public update(id:any,data:any): Observable<any>{
  return this.http.put(`${this.API_URL}cultivos/${id}/`,data);
 }
 
 //eliminar producto
 public delete(id:any):Observable<any>{
  return this.http.delete(`${this.API_URL}cultivos/${id}/`);
 }

}

