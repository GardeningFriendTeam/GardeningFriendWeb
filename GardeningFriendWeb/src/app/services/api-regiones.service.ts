import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRegionesService {

  constructor(private http: HttpClient) { }

  getDataProvincias() {
    return this.http.get('https://apis.datos.gob.ar/georef/api/provincias');
  }

  getDataMunicipios(provinciaID:number){
    return this.http.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaID}&campos=id,nombre&max=100`);
  }

  getDataLocalidades(MunicipioID:number){
    return this.http.get(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${MunicipioID}&campos=id,nombre&max=100`);
  }
}