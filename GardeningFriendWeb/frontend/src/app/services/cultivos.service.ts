import { Injectable } from '@angular/core';
import { Cultivo } from '../enciclopedia/cultivos/cultivos.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultivosService {

  API_URL = 'http://127.0.0.1:8000/cultivos/cultivos/';
  
  cultivoFavorito: Cultivo[] = [];

  addToFavorites(cultivo: Cultivo): boolean {
    const existingFavorite = this.cultivoFavorito.find(favorite => favorite.id_cultivo === cultivo.id_cultivo);
  
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
    return this.http.get<Cultivo[]>(this.API_URL);
  }
}
