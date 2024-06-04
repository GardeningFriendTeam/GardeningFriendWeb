import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CultivosService } from 'src/app/services/cultivos.service';
import { CategoriaCultivo } from 'src/app/models/categoriaCultivo';
import { Cultivo } from 'src/app/enciclopedia/cultivos/cultivos.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cultivo',
  templateUrl: './agregar-cultivo.component.html',
  styleUrls: ['./agregar-cultivo.component.scss']
})
export class AgregarCultivoComponent {
  categorias: CategoriaCultivo[] = [];
  nombre: string = "";
  categoriaNombre?: string;
  categoriaId: any;
  categoriaSeleccionada!: any;
  descripcion: string = "";
  imagen!: File;
  region: string = "";
  estacion: string = "";
  temperatura: any;
  favorito: boolean = false;

  constructor(private cultivoService: CultivosService, private router: Router) {}

  ngOnInit(): void {
    this.cultivoService.traerCategorias().subscribe(resp2 => {
      this.categorias = resp2;
    });
  }

  guardarNombre(event: any) {
    this.nombre = event.target.value;
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
    this.descripcion = event.target.value;
  }

  enviarFoto(event: any) {
    this.imagen = event.target.files[0];
  }

  guardarRegion(event: any) {
    this.region = event.target.value;
  }

  guardarEstacion(event: any) {
    this.estacion = event.target.value;
  }

  guardarTemperatura(event: any) {
      this.temperatura = event.target.value !== "" ? parseFloat(event.target.value) : null;
  }
  
  create() {
    const cultivoNuevo = {
      nombre: this.nombre,
      categoria: {
        nombre: this.categoriaSeleccionada.nombre
      },
      descripcion: this.descripcion,
      region: this.region,
      estacion: this.estacion,
      temperatura: this.temperatura || 0,
      favorito: this.favorito
    };

    const formData = new FormData();
    formData.append('imagen', this.imagen, this.imagen.name);
    formData.append('nombre', this.nombre);
    formData.append('categoria', this.categoriaSeleccionada.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('region', this.region);
    formData.append('estacion', this.estacion);
    formData.append('temperatura', JSON.stringify(this.temperatura));
    formData.append('favorito', JSON.stringify(cultivoNuevo.favorito));
  
    this.cultivoService.create(formData).subscribe(
      cultivo => {
        Swal.fire({
          icon: 'success',
          title: 'Cultivo creado',
          text: 'El cultivo se ha creado con éxito',
        });
        this.router.navigate(['/administrarCultivos']);
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear el cultivo',
        });
      }
    );
  }
}
