import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CultivosService } from 'src/app/services/cultivos.service';
import { Cultivo } from 'src/app/enciclopedia/cultivos/cultivos.model';
import { CategoriaCultivo } from 'src/app/models/categoriaCultivo';

@Component({
  selector: 'app-agregar-cultivo',
  templateUrl: './agregar-cultivo.component.html',
  styleUrls: ['./agregar-cultivo.component.scss']
})
export class AgregarCultivoComponent {
  cultivos: any = {};
  categorias: any = {};

  nombre: string = "";
  categoria: any;
  descripcion: string = "";
  imagen!: File;
  region: string = "";
  estacion: string = "";
  temperatura: string = "";

  constructor(private cultivoService: CultivosService, private router: Router){

  }

  ngOnInit(): void {
    this.cultivoService.traerCategorias().subscribe(resp2 => {
      this.categorias = resp2;

    })
   }

  // create(): void{
  //   const cultivo = new FormData();
  //   cultivo.append('nombre',this.nombre)
  //   this.cultivoService.create(cultivo).subscribe(
  //     data=>this.router.navigate(['/verCultivo'])
  //   );
  //   console.log(cultivo);
  // }

  guardarNombre(event: any) {
    console.log(this.nombre = event.target.value)
  }

  guardarCategoria(event: any) {
    console.log(this.categoria = event.target.value)
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

  selectCategoria(event: any) {
    console.log(this.categoria = event.target.value)
  }

  





  create() {
    const cult = new FormData();
    cult.append('nombre', this.nombre);
    cult.append('categoria', this.categoria);
    cult.append('descripcion', this.descripcion);
    cult.append('imagen', this.imagen, this.imagen!.name);
    cult.append('region', this.region);
    cult.append('estacion', this.estacion);
    cult.append('temperatura', this.temperatura);
    
    
    this.cultivoService.create(cult).subscribe(
      cultivo => this.router.navigate(['/administrarCultivos'])
      ,
      error => console.log(error)

    );



  }

}
