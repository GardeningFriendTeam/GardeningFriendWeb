import { Injectable } from '@angular/core';
import { Cultivo } from '../enciclopedia/cultivos/cultivos.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultivosService {

  API_URL = 'http://127.0.0.1:8000/cultivos/crops/';
  
  cultivoFavorito: Cultivo[] = [];

  addToFavorites(cultivo: Cultivo) {
    if (!this.cultivoFavorito.includes(cultivo)) {
      this.cultivoFavorito.push(cultivo);
      return true; // Indica que se agrego
    }
    return false; // Indica que el cultivo ya esta en favoritos
  }

  getFavorites() {
    return this.cultivoFavorito;
  }

  constructor(private http:HttpClient) { }

  listCultivos():Observable<Cultivo[]>{
    return this.http.get<Cultivo[]>(this.API_URL);
  }
}
