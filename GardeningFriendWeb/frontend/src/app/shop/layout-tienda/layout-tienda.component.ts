// funcionalidades de Angular
import { Component, ElementRef, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// servicios:
import { ApiRegionesService } from '../../services/api-regiones.service';
// componente hijo:
import { ProductosComponent } from '../productos/productos.component';
// interfaces:
import { Productos } from './productos';
import { SelecCarrito } from './selec-carrito';
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
  // regiones obtenidas por la API
  dataProvincias$:any;
  dataMunicipios$:any;
  dataLocalidades$: any;

  constructor(private ApiRegionesService: ApiRegionesService){}

  // PROPIEDADES:
  // funcionalidad buscador:
  palabraBusqueda:string = "";
  buscarProducto(){
    this.products.forEach(element => {
      if(element.name.toLowerCase().includes(this.palabraBusqueda.toLowerCase())){
        return element.visibilidad = false;
      } else{
        return element.visibilidad = true;
      }
    });
  }
  // productos de prueba
  products:Productos[] = [
    {
      name: 'Garden Hose',
      id: 'GH123',
      default_price: '29.99',
      description: 'A durable garden hose for watering plants and lawns.',
      images: ['../../assets/iconos/info-icon.png'],
      visibilidad: true,
      precio: 29.99,
      stock: 50,
      categoria: 'Gardening',
      peso: '1.2 kg',
      dimensiones: '20 x 20 x 5 cm'
    },
    {
      name: 'Pruning Shears',
      id: 'PS456',
      default_price: '19.99',
      description: 'High-quality pruning shears for trimming bushes and small branches.',
      images: ['../../assets/iconos/info-icon.png'],
      visibilidad: true,
      precio: 19.99,
      stock: 40,
      categoria: 'Gardening',
      peso: '0.3 kg',
      dimensiones: '18 x 8 x 2 cm'
    },
    {
      name: 'Gardening Gloves',
      id: 'GG789',
      default_price: '9.99',
      description: 'Comfortable and protective gardening gloves for working in the garden.',
      images: ['../../assets/iconos/info-icon.png'],
      visibilidad: true,
      precio: 9.99,
      stock: 100,
      categoria: 'Gardening',
      peso: '0.2 kg',
      dimensiones: '25 x 10 x 2 cm'
    },
    {
      name: 'Fertilizer',
      id: 'F1234',
      default_price: '14.99',
      description: 'High-quality fertilizer for promoting healthy plant growth.',
      images: ['../../assets/iconos/info-icon.png'],
      visibilidad: true,
      precio: 14.99,
      stock: 20,
      categoria: 'Gardening',
      peso: '1.5 kg',
      dimensiones: '15 x 10 x 5 cm'
    }
  ];
  precios:Precios[] = [];
  articles:any;
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
  //funcionalidades modal COMPRA
  abrirModal:boolean = false;
  //funcionalidades modal TERMINAR COMPRA
  // elemento modal
  abirFormasPago:boolean = false;
  metodoSeleccionado:string = "";
  mostrarEjemploCodigo:boolean = false;
  mostrarEjemploExpiracion:boolean = false;
  remarcarMensajeCantidad:boolean = false;
  // datos tarjeta
  numeroTarjetaInput:string = "";
  codigoTarjetaInput:string = "";
  expiracionTarjetaInput:string = "";
  // costos
  costoCompra:number = 0;
  envioCiudad:number = 500;
  envioProvincia:number = 1000;
  envioPais:number = 2000;
  // regiones
  costoRegionSeleccionada:number = 0;
  direccionSeleccionada:string = "";
  nombreProvincia:any;
  nombreMunicipio:any;
  nombreLocalidad:any;
  // costo final
  valorTotalCompra:number = this.costoCompra + this.costoRegionSeleccionada;
  //expresiones regulares
  numeroTarjetaRegex:RegExp = /^(\d{4}[- ]){3}\d{4}|\d{16}$/;
  codigoSeguridadRegex:RegExp = /^\d{3}$/;
  expiracionRegex:RegExp = /^(20[2-9][3-9]|2[1-9][0-9]{2})-(0[5-9]|1[0-2])$/;
  direccionRegex:RegExp = /^[a-zA-Z0-9áéíóúñ\s]*$/;
  localidadRegex:RegExp = /^[\p{L}\sáéíóúñÁÉÍÓÚÑ]+$/u;
  provinciaRegex:RegExp = /^[\p{L}\sáéíóúñÁÉÍÓÚÑ]+$/u;
  // imagenes iconos validacion:
  iconos = {
    doneIcon: "../../../assets/imagenes-tienda/done-icon.png",
    notDoneIcon: "../../../assets/imagenes-tienda/not-done-icon.png",
    invalidIcon: "../../../assets/imagenes-tienda/invalid-icon.png"
  }
  // variables booleanas (modales finalizar compra):
  compraRealizada:boolean = false;
  datosPagoOk:boolean = false;
  datosDireccion:boolean = false;
  pagoTransferencia:boolean = false;
  errorInputs:boolean = false;
  noHayMedioPago:boolean = false;
  // propiedades API regiones:
  provincias_options: Array<object> = [];
  // valores que se pasan al componente hijo:
  abrirModDetalles:boolean = false;
  nombreProductoDetalles:string = "hola";
  // carrito
  mensajeCarrito:boolean = false;
  carrito:boolean = false;
  selecCarrito:SelecCarrito[] = [];

  // FUNCIONALIDADES:

  // creando productos de muestra

  // extrae los datos del prod. seleccionado para hacer la compra
  comprarProducto(event: MouseEvent){
    // 1 - se abre el modal:
    this.abrirModal = true;
    // 2 - se identifica el producto clickeado:
    const clickedItem = event.target as HTMLElement;
    const productoSeleccionado = clickedItem.parentElement!.parentElement;
    console.log(productoSeleccionado);
    // 3 - se obtienen los valores interpolados asociados a este:
    this.products.forEach(product => {
      if (productoSeleccionado!.id == product.name){
        this.prodSeleccionado = this.products.indexOf(product);
        this.nombreProdSeleccionado = product.name;
        this.imagenProdSeleccionado = product.images;
        this.valorUnitario = product.precio;
        this.stockProducto = product.stock;
      }
    });
  }

  validarCantidad(){
    if(this.cantidadElegida >= this.stockProducto || this.cantidadElegida < 0){
      this.limiteStock = true;
    } else{
      this.limiteStock = false;
    }
  }

  cerrarModalCompra(){
    // se resetean las variables de referencia:
    this.abrirModal = false;
    this.cantidadElegida = 0;
    this.remarcarMensajeCantidad = false;
    this.mensajeCarrito = false;

  }

  abrirMetodosPago(cantidad:number){
  // se cierra el modal anterior y se abre uno nuevo:
  if (cantidad>0){
    // si el usuario selecciono al menos una unidad
    this.cerrarModalCompra();
    this.abirFormasPago = true;
    // valor de la compra realizada
    this.costoCompra = this.cantidadElegida * this.valorUnitario;
    return;
  } else{
    // se remarca el mensaje que debe comprar al menos una unidad
    this.remarcarMensajeCantidad = true;
  }
  }

  cerrarMetodosPago(){
  // se modifica el stock (solo para efecto visual por ahora):
  //this.products[this.prodSeleccionado].stock -= this.cantidadElegida;
  // reseteo de propiedades:
  this.cantidadElegida = 0;
  this.remarcarMensajeCantidad = false;
  this.mensajeCarrito = false;
  this.datosPagoOk = false;
  this.datosDireccion = false;
  this.pagoTransferencia = false;
  this.noHayMedioPago = false;
  this.errorInputs = false;
  this.compraRealizada = false;
  // se cierra modal:
  this.abirFormasPago = false;
  }

  modalCodigo(){
  this.mostrarEjemploCodigo = !this.mostrarEjemploCodigo;
  }

  modalExpiracion(){
  this.mostrarEjemploExpiracion = !this.mostrarEjemploExpiracion;
  }
  
  sumarCostosFinales(){
    return this.costoCompra + this.costoRegionSeleccionada;
  }

  cerrarValidarCompra(){
    // se cierra el modal:
    this.compraRealizada = false;
    // se resetean variables de validacion:
    this.abirFormasPago = false;
    this.datosPagoOk = false;
    this.datosDireccion = false;
    this.pagoTransferencia = false;
    this.noHayMedioPago = false;
    this.errorInputs = false;
  }

  validarExpiracion(){
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Adding 1 to match the format of the month input field
      
    const monthInputValue = this.expiracionTarjetaInput; // Example value from the month input field
    const [inputYearString, inputMonthString] = monthInputValue.split("-"); // Extracts year and month values from the input value
    const inputYear = parseInt(inputYearString);
    const inputMonth = parseInt(inputMonthString);
      
    const regexPattern = new RegExp(
      `^${currentYear}${currentMonth > 9 ? "|" + (currentYear + 1) : ""}-${currentMonth > 9 ? "1[0-2]|" : `${currentMonth}|`}0${currentMonth}${
        inputYear > currentYear || (inputYear == currentYear && inputMonth >= currentMonth) ? "|0[1-9]|1[0-2]" : ""
      }$`
    );
    
    return regexPattern;
  }

  // form reactivo para validar los datos en la caja:
  cajaValidacion = new FormGroup({
    //metodo de pago:
    medioPagoSeleccionado: new FormControl('',Validators.required),
    // datos tarjeta credito / debito:
    InputNumeroTarjeta: new FormControl('', [Validators.required, Validators.pattern(this.numeroTarjetaRegex)]),
    InputCodSegTarjeta: new FormControl('', [Validators.required, Validators.pattern(this.codigoSeguridadRegex)]),
    InputExpTarjeta: new FormControl('', [Validators.required, Validators.pattern(this.expiracionRegex)]),
    //datos billetera virtual:
    InputNumeroBilletera: new FormControl('', [Validators.required, Validators.pattern(this.numeroTarjetaRegex)]),
    InputCodSegBilletera: new FormControl('', [Validators.required, Validators.pattern(this.codigoSeguridadRegex)]),
    InputExpBilletera: new FormControl('', [Validators.required, Validators.pattern(this.expiracionRegex)]),
    // datos direccion:
    InputDireccion: new FormControl('', [Validators.required, Validators.pattern(this.direccionRegex)]),
    InputProvincia: new FormControl('', [Validators.required, Validators.pattern(this.provinciaRegex)]),
    InputLocalidad: new FormControl('', [Validators.required, Validators.pattern(this.localidadRegex)]),
    // datos select region:
    SelectProvincia: new FormControl('',Validators.required),
    SelectMunicipio: new FormControl('',Validators.required),
    SelectLocalidad: new FormControl('',Validators.required),

  });

  ngOnInit(){
    // valida el metodo de pago seleccionado:
    this.cajaValidacion.get('medioPagoSeleccionado')!.valueChanges.subscribe(value => {
      if (value === 'tajeta_credito_debito') {
        this.metodoSeleccionado = "tajeta_credito_debito";
      } else if(value === 'transferencia'){
        this.metodoSeleccionado = "transferencia";
      } else if(value === 'billetera_virtual'){
        this.metodoSeleccionado = "billetera_virtual";
      }
    });
    
    // consume los datos de cada provincia desde la API:
    this.ApiRegionesService.getDataProvincias().subscribe((response: any) => {
      // datos provincias:
      this.dataProvincias$ = response.provincias;
      console.log("provincias", this.dataProvincias$);
    });

    // consume los datos de cada producto desde la API de Stripe:
    //this.datosProductos();
    
  }
  
  onSubmit(){
    // validacion final de campos (medios de pago):
    if(this.metodoSeleccionado == "tajeta_credito_debito"){
      if(this.cajaValidacion.controls.InputExpTarjeta.valid && 
        this.cajaValidacion.controls.InputCodSegTarjeta.valid &&
        this.cajaValidacion.controls.InputExpTarjeta.valid){
          this.datosPagoOk = true;
      } else{
        alert("faltan campos por completar!");
      }
    // si todos los valores de la billetera virtual estan OK:
    } else if(this.metodoSeleccionado == "billetera_virtual"){
      if(this.cajaValidacion.controls.InputNumeroBilletera.valid && 
        this.cajaValidacion.controls.InputCodSegBilletera.valid &&
        this.cajaValidacion.controls.InputExpBilletera.valid){
          this.datosPagoOk = true;
      } else{
        alert("faltan campos por completar!");
      }
    // la validacion se hace via backend / revisando comprobante
    } else if(this.metodoSeleccionado == "transferencia"){
      this.datosPagoOk = true;
      this.pagoTransferencia = true;
    } else {this.noHayMedioPago = true};
    // validacion campos direccion
    if(this.cajaValidacion.controls['InputDireccion'].valid &&
      this.cajaValidacion.controls['SelectProvincia'].valid &&
      this.cajaValidacion.controls['SelectMunicipio'].valid &&
      this.cajaValidacion.controls['SelectLocalidad'].valid){
        this.datosDireccion = true;
      }
    // validacion final (datos pago + direccion):
    if (this.datosPagoOk && this.datosDireccion){
      this.compraRealizada = true;
    } else{
      this.errorInputs = true;
    }
  }

  cambiarIconoSrc(campo:FormControl, regexp:RegExp){
    const getValue = campo.value;
    // campo vacio
    if(getValue == ""){
      return this.iconos.notDoneIcon;
    } else{
      // campo completado / en proceso:
      if(regexp.test(getValue)){
        // valid
        return this.iconos.doneIcon;
      } else{
        //invalid
        return this.iconos.invalidIcon;
      }
    }

  }

  calcularEnvio(provincia:FormControl){
    // 1ro - se valida que los campos esten completo
    const proValue = provincia.value;
    if(proValue == "Córdoba"){
      // envio a provincia:
      this.costoRegionSeleccionada = this.envioProvincia;
      return "$" + this.costoRegionSeleccionada;

    } else if(proValue == ""){
      // campo vacio:
      return "calulando..";

    } else{
      // otra provincia:
      this.costoRegionSeleccionada = this.envioPais;
      return "$" + this.costoRegionSeleccionada;
    }
  }

  mostrarError(campo:FormControl){
    const valorCampo = campo.value;
    if(!campo.valid && valorCampo != ""){
      // si el valor ingresado es inavlido se muestra el error:
      return true;
    } else{
      // de lo contrario se mantiene oculto:
      return false;
    }
  }

  onSelectProvincia(){
    // se obtiene la prov seleccionada:
    this.nombreProvincia = this.cajaValidacion.get('SelectProvincia')!.value;
    // se seleccionan los municipios correspondientes a la provincia:
    this.ApiRegionesService.getDataMunicipios(this.nombreProvincia).subscribe((response:any) => {
      this.dataMunicipios$ = response.municipios;
      console.log("municipios", this.dataMunicipios$);
    });
  }

  onSelectMunicipio(){
    //se obtiene el municipio seleccionado:
    this.nombreMunicipio = this.cajaValidacion.get('SelectMunicipio')!.value;
    // se muestran as localidades correspondientes:
    this.ApiRegionesService.getDataLocalidades(this.nombreMunicipio).subscribe((response:any) => {
      this.dataLocalidades$ = response.localidades;
      console.log("localidades", this.dataMunicipios$);
    });
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

  agregarCarrito(){
    // 1 - se crea objeto representado el prod elegido
    let productos:SelecCarrito = {
      name: this.nombreProdSeleccionado,
      images: this.imagenProdSeleccionado,
      cantidad: this.cantidadElegida,
      precioTotal: this.valorUnitario * this.cantidadElegida,
    }
    // 3 - finalmente se agrega la compra al array de productos:
    this.selecCarrito.push(productos);
  }

  abrirCarrito(){
    //toggle function
    this.carrito = !this.carrito;
  }

  cerrarCarrito(event:boolean){
    // toma el valor que se recibe del componente hijo "carrito" via output;
    this.carrito = event;
  }

  abrirMetodosPagoCarrito(event:number){
    this.costoCompra = event;
    this.carrito = false;
    this.abirFormasPago = true;
  }

}
