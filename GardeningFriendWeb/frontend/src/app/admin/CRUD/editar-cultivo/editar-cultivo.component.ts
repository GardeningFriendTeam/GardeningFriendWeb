import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CultivosService } from 'src/app/services/cultivos.service';
import { Cultivo } from 'src/app/enciclopedia/cultivos/cultivos.model';
import { CategoriaCultivo } from 'src/app/models/categoriaCultivo';

@Component({
  selector: 'app-editar-cultivo',
  templateUrl: './editar-cultivo.component.html',
  styleUrls: ['./editar-cultivo.component.scss']
})
export class EditarCultivoComponent{
  cultivos: any = {};
  categorias: any = {};

  // id: string = "";
  nombre: string = "";
  categoria: string = "";
  descripcion: string = "";
  imagen!: File;
  region: string = "";
  estacion: string = "";
  temperatura: string = "";

  constructor(private cultivosService: CultivosService, private activatedRouter: ActivatedRoute, private router: Router){

    const id = this.activatedRouter.snapshot.params['id'];
    console.log(id);
    let datos:any= {};
    this.cultivosService.detail(id).subscribe(
      data=>{
        this.cultivos = data;
      },err =>{
        alert("Error al traer el cultivo");
        this.router.navigate(['']);
      }
    )
  }

  ngOnInit(): void {
    this.cultivosService.traerCategorias().subscribe(resp2 => {
      this.categorias = resp2;
    })
  }

guardarId(event: any) {
  console.log("Ahora id:",this.cultivos.id)
  console.log(this.cultivos.id = event.target.value)
}

guardarNombre(event: any) {
  console.log(this.nombre = event.target.value)
}

guardarDescripcion(event: any) {
  console.log(this.descripcion = event.target.value)
}

guardarCategoria(event: any) {
  console.log(this.categoria = event.target.value)
}

selectCategoria(event: any) {
  console.log(this.categoria = event.target.value)
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
    cult.append('categoria', this.categoria);
    cult.append('descripcion', this.cultivos.descripcion);
    cult.append('imagen', this.imagen, this.imagen!.name);
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
      cult.append('categoria', this.categoria);
      cult.append('descripcion', this.cultivos.descripcion);
      cult.append('imagen', this.imagen, this.imagen!.name);
      cult.append('region', this.cultivos.region);
      cult.append('estacion', this.cultivos.estacion);
      cult.append('temperatura', this.cultivos.temperatura);
      
      const id = this.activatedRouter.snapshot.params['id'];
      this.cultivosService.update(id, cult).subscribe(
        data => {
          this.router.navigate(['/administrarCultivos']);
        }, err =>{
          alert("Error al modificar el cultivo");
          this.router.navigate(['']);
        }
      )
    }

}

