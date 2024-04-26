// funcionalidades angular
import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
// componente padre
import { LayoutTiendaComponent} from '../layout-tienda/layout-tienda.component';
// interfaces
import { Precios } from '../layout-tienda/precios';
import { Productos } from '../layout-tienda/productos';
import { SelecCarrito } from '../layout-tienda/selec-carrito';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit{
  // propiedades que se reciben del componente padre
  @Input() seleccion:SelecCarrito[];
  @Input() estadoModal:boolean;
  // propiedad para pasar el estado booleano del modal al componente padre
  @Output() propBooleana = new EventEmitter<boolean>();
  // propiedad para pasar el total de la compra al componente padre:
  @Output() enviarTotal = new EventEmitter<number>();
  // valor total de la compra
  valorTotal:number = 0;
  
  constructor(){
    // inicializando propiedades:
    this.seleccion = []
    this.estadoModal = false;
  }

  //funcion para actualizar el estado booleano del modal:
  cerrarCarrito(){
    this.estadoModal = false;
    this.propBooleana.emit(this.estadoModal);
  }
  
  // suma el valor total de todos los productos seleccionados:
  calcularTotal(){
    this.seleccion.forEach(element => {
      this.valorTotal += element.precioTotal
    });
    console.log("costo final: $", this.valorTotal);
  }
  ngOnInit(){
    this.calcularTotal();
  }


  // funcion para enviar el monto total al elem padre:
  enviarTotales(){
    this.enviarTotal.emit(this.valorTotal);
  }

  
}