// funcionalidades de Angular
import { Component, ElementRef, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// servicios:
import { StripeapiService } from 'src/app/services/stripeapi.service';
// interfaces:
import { Productos } from './productos';
import { Precios } from './precios';

@Component({
  selector: 'app-layout-tienda',
  templateUrl: './layout-tienda.component.html',
  styleUrls: ['./layout-tienda.component.scss']
})

export class LayoutTiendaComponent implements OnInit{

  // instruccion para utilizar el modulo elementRed
  //constructor(private elementRef: ElementRef){}
  // funcionalidades para vistas responsive
  public getScreenSize(): string {
    const width = window.innerWidth;
    if (width < 600) {
      return 'grid_principal_movil';
    } else if (width >= 600 && width < 992) {
      return 'grid_principal_tablet';
    } else {
      return 'grid_principal_escritorio';
    }
  }


  constructor(private StripeapiService: StripeapiService){}

  // PROPIEDADES:
  // funcionalidad buscador:
  palabraBusqueda:string = "";
  // productos de prueba
  stripeProducts:Productos[] = [];
  filteredProducts:Productos[] = []
  stripePrices:Precios[] = [];
  stripeArticles:any;
  idProduct:string = "";
  //valores para insertar en el modal de compra:
  // ubicacion numerica en el array:
  prodSeleccionado:number = 0;
  //nombre prod seleccionado:
  nombreProdSeleccionado:string = "";
  imagenProdSeleccionado:any;
  valorUnitario:number = 0;
  stockProducto:number = 0;
  cantidadElegida:number = 0;
  limiteStock:boolean = false;
  // valores que se pasan al componente hijo:
  abrirModDetalles:boolean = false;
  nombreProductoDetalles:string = "hola";

  // FUNCIONALIDADES:

  datosProductos(){
    // obtiene los datos de los productos:
    this.StripeapiService.getProducts().subscribe((response:any) =>{
      this.stripeProducts = response.data;
      this.filteredProducts = response.data;
      console.log("productos: ", this.stripeProducts);
    });
    // obtiene los datos de los precios:
    this.StripeapiService.getPrices().subscribe((response:any) =>{
      this.stripePrices = response.data
      // quita los dos decimales del final:
      this.stripePrices.forEach(element => {
        element.unit_amount_decimal = element.unit_amount_decimal.slice(0, -2);
      });
      console.log("precios: " , this.stripePrices);
    });
    // combina los arrays "precios" y "productos" en uno solo:
  }

  filtrarProductos(products: Productos[],searchTerm: string): Productos[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return products; // Return all products if search term is empty
    }
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onSearchTermChange(): void {
    this.filteredProducts = this.filtrarProductos(this.stripeProducts, this.palabraBusqueda);
  }

  // lleva al usuario al checkout correspondiente para terminar el pago
  comprarProducto(link:string){
    window.location.href = link
  }


  ngOnInit(){
    // fetching data
    this.datosProductos();
  }


  verDetalles(event: MouseEvent){
    // 1 - se abre el modal de los detalles:
    this.abrirModDetalles = true;
    // 2 - se identifica el producto clickeado:
    const clickedItem = event.target as HTMLElement;
    const producto = clickedItem.parentElement!.parentElement;
    this.nombreProdSeleccionado = producto!.id;
    // console.log("seleccion:", this.nombreProdSeleccionado);
  }

  onBooleanChanged(value: boolean) {
    this.abrirModDetalles = value;
  }

}
