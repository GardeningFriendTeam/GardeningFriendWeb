import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CultivosService } from 'src/app/services/cultivos.service';
import { CategoriaCultivo } from 'src/app/models/categoriaCultivo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cultivo',
  templateUrl: './agregar-cultivo.component.html',
  styleUrls: ['./agregar-cultivo.component.scss']
})
export class AgregarCultivoComponent {
  categorias: CategoriaCultivo[] = [];
  nombre: string = "";
  categoriaNombre?: string; // Guardar el nombre de la categoría seleccionada
  descripcion: string = "";
  imagen: File | null = null;
  region: string = "";
  estacion: string = "";
  temperatura: number | null = null;
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
    this.categoriaNombre = event.target.value; // Guardar el nombre de la categoría
  }

  guardarDescripcion(event: any) {
    this.descripcion = event.target.value;
  }

  enviarFoto(event: any) {
    this.imagen = event.target.files[0] || null;
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
    if (!this.categoriaNombre) {
      console.log('Categoría no seleccionada');
      return;
    }
    const cult = new FormData();
    cult.append('nombre', this.nombre);
    cult.append('categoria', JSON.stringify({ nombre: this.categoriaNombre }));
    cult.append('descripcion', this.descripcion);
    cult.append('imagen', this.imagen || "");
    cult.append('region', this.region);
    cult.append('estacion', this.estacion);
    cult.append('temperatura', this.temperatura !== null ? this.temperatura.toString() : "");
    cult.append('favorito', this.favorito.toString());

    this.cultivoService.create(cult).subscribe(
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
