// funcionalidades angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// models
import { Productos } from '../shop/layout-tienda/productos';
import { Precios } from '../shop/layout-tienda/precios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeapiService {

  constructor(private http: HttpClient){}

  // claves para poder acceder a nuestra BD de Stripe:
  // esconder antes de llevar a main!
  private keys = {
    public: environment.stripeApiKeyPublic,
    secret: environment.stripeApiKeyPrivate,
  }
  private options = { headers: {Authorization: `Bearer ${this.keys.secret}`}}

  // funciones para consumir datos de API
  getProducts(){
    return this.http.get("https://api.stripe.com/v1/products?active=true", this.options);
  }

  getPrices(){
    return this.http.get("https://api.stripe.com/v1/prices", this.options);
  }
}
