import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CultivosService } from 'src/app/services/cultivos.service';
import { Cultivo } from 'src/app/enciclopedia/cultivos/cultivos.model';
import { CategoriaCultivo } from 'src/app/models/categoriaCultivo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cultivo',
  templateUrl: './editar-cultivo.component.html',
  styleUrls: ['./editar-cultivo.component.scss']
})
export class EditarCultivoComponent{
  cultivos: any = {};
  categorias: CategoriaCultivo[] = [];
  nombre: string = "";
  descripcion: string = "";
  imagen!: File;
  region: string = "";
  estacion: string = "";
  temperatura: string = "";
  categoriaNombre?: string;
  categoriaId: any;
  categoriaSeleccionada!: any;

  constructor(private cultivosService: CultivosService, private activatedRouter: ActivatedRoute, private router: Router){

    const id = this.activatedRouter.snapshot.params['id'];
    console.log(id);
    let datos:any= {};
    this.cultivosService.detail(id).subscribe(
      data=>{
        this.cultivos = data;
        this.categoriaSeleccionada = this.cultivos.categoria;
        console.log(this.categoriaSeleccionada)
      },err =>{
        alert("Error al traer el cultivo");
        this.router.navigate(['']);
      }
    )
  }

  ngOnInit(): void {
    this.cultivosService.traerCategorias().subscribe(resp2 => {
      this.categorias = resp2;
      this.categoriaSeleccionada = this.categorias.find(cat => cat.id === this.cultivos.categoria.id);
    })
  }


  guardarId(event: any) {
    console.log("Ahora id:",this.cultivos.id)
    console.log(this.cultivos.id = event.target.value)
  }

  guardarNombre(event: any) {
    console.log(this.nombre = event.target.value)
  }
  selectCategoria(event: any) {
    // Obtener el índice seleccionado del select
    const selectedIndex = event.target.selectedIndex;
    
    // Obtener el objeto de la categoría seleccionada usando el índice
    this.categoriaSeleccionada = this.categorias[selectedIndex - 1];

    // Asignar el nombre y el id de la categoría seleccionada a las variables correspondientes
    this.categoriaNombre = this.categoriaSeleccionada.nombre; 
    this.categoriaId = this.categoriaSeleccionada.id;

    console.log(this.categoriaSeleccionada);
  }

  guardarDescripcion(event: any) {
    console.log(this.descripcion = event.target.value)
  }

  enviarFoto(event: any) {
    console.log(this.imagen = event.target.files[0])
  }

  guardarRegion(event: any) {
    console.log(this.region = event.target.value)
  }

  guardarEstacion(event: any) {
    console.log(this.estacion = event.target.value)
  }

  guardarTemperatura(event: any) {
    console.log(this.temperatura = event.target.value)
  }

  actualizar(){
    const cult = new FormData();
      //produ.append('nombre', this.productos.id);
      cult.append('nombre', this.cultivos.nombre);
      cult.append('categoria', this.categoriaSeleccionada);
      cult.append('descripcion', this.cultivos.descripcion);
      if(this.imagen){
        cult.append('imagen', this.imagen, this.imagen!.name);
      }
      cult.append('region', this.cultivos.region);
      cult.append('estacion', this.cultivos.estacion);
      cult.append('temperatura', this.cultivos.temperatura);
      
      
      console.log(this.cultivos.id)
      this.cultivosService.update(this.cultivos.id,cult).subscribe(
        data => this.router.navigate(['/administrarCultivo'])

        ,
        error => console.log(error)

      );
  }
  
    onUpdate(): void{
      const cult = new FormData();
      //produ.append('nombre', this.productos.id);
      cult.append('nombre', this.cultivos.nombre);
      cult.append('categoria', this.categoriaSeleccionada.nombre);
      cult.append('descripcion', this.cultivos.descripcion);
      cult.append('imagen', this.imagen, this.imagen!.name);
      cult.append('region', this.cultivos.region);
      cult.append('estacion', this.cultivos.estacion);
      cult.append('temperatura', this.cultivos.temperatura);
      
      const id = this.activatedRouter.snapshot.params['id'];
      this.cultivosService.update(id, cult).subscribe(
        cultivo => {
          Swal.fire({
            icon: 'success',
            title: 'Cultivo modificado',
            text: 'El cultivo se ha modificado con éxito',
          });
          this.router.navigate(['/administrarCultivos']);
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al modificar el cultivo',
          });
        }
      );
    }

}


