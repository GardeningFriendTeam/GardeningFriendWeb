import { Component, Input ,EventEmitter, Output} from '@angular/core';
import { Productos } from '../layout-tienda/productos';
import { Precios } from '../layout-tienda/precios';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent{
  // propiedades que se reciben desde
  // el componente padre
  @Input() prodID:string;
  @Input() prodDetalles:Productos[];
  @Input() prodPrecios:Precios[];
  // propiedades que se exportan al comp. padre:
  @Output() booleanProperty = new EventEmitter<boolean>();
  
  // detalles del producto:
  prodSeleccionado:any;

  constructor() {
    // se inicializan las propiedades
    // que se reciben via input
    this.prodID = ''; 
    this.prodDetalles = [];
    this.prodPrecios = [];
  }


  // variable que representa
  // el estado del modal:
  estadoModal = true;
  cerrarModal(){
    this.estadoModal = false;
    this.booleanProperty.emit(this.estadoModal);
  }

  ngOnInit(){
    // busca los detalles producto seleccionado
    // para posteriormenete interpolarlos a la plantilla:
    this.prodDetalles.forEach(element => {
      if (element.name == this.prodID) {
        this.prodSeleccionado = element;
        console.log("producto seleccionado: ", element);
      }
    });
  }

}
