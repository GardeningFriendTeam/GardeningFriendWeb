// funcionalidades angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// models
import { Productos } from '../shop/layout-tienda/productos';
import { Precios } from '../shop/layout-tienda/precios';

@Injectable({
  providedIn: 'root'
})
export class StripeapiService {

  constructor(private http: HttpClient){}

  // claves para poder acceder a nuestra BD de Stripe:
  // esconder antes de llevar a main!
  private keys = {
    public: "pk_test_51NGSLELIKQsbX3PlpdOpCvYDqW4LPNfMZscKtQfek4Dsw4ojUPcnSQKG46F3pWpVO0Ru6Mzs8vET6rGkTCkG9Coc00YDGCRwTY",
    secret: "sk_test_51NGSLELIKQsbX3PlxTUqAxQAxnxSXBB5QyFZZ7VGdyHqkHPieoDtRMgEowZVRsTqWrAFi7voXdkmp4uxkvb8MFQ600omQ0Fzf6",
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
