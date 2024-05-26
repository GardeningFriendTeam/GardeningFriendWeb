import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { CategoriaCultivo } from '../models/categoriaCultivo';

@Injectable({
  providedIn: 'root'
})
export class CategoriaCultivoService {

  url:string="http://localhost:8000/api/"
  constructor(private http:HttpClient) { }

  ngOnInit(){}

//categorias
obtenerCategorias():Observable<any>{
   return this.http.get(this.url+"categoriaCultivo/");
   
 }

//obtener categoria
 public detail(id:number): Observable<CategoriaCultivo>{
  //  return this.http.get<Categoria>(this.url+'categoria/'+ `detail/${id} `);
  return this.http.get<CategoriaCultivo>(this.url + 'categoriaCultivo/'+ id + '/');
 };

//alta de una categoría
public create(categoria:any):Observable<any>{
  
  return this.http.post(this.url+'categoriaCultivo/',categoria);
} 

//actualizar categoría
public update(id:any,categoria: CategoriaCultivo): Observable<any>{
//  return this.http.put(this.url+'categoria/'+ `update/${id}`+ '/',categoria);
  return this.http.put(this.url+'categoriaCultivo/'+id+ '/',categoria);  
}

//eliminar categoría
public delete(id:number):Observable<any>{
//  return this.http.delete<Categoria>(`${this.url+'categoria'}/${id}`);
  return this.http.delete<CategoriaCultivo>(this.url+'categoriaCultivo/'+ id + '/');
}
}
