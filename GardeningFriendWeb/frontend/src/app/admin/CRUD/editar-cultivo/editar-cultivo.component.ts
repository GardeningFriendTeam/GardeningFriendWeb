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
export class EditarCultivoComponent implements OnInit {
  cultivos: Cultivo = {
    id: 0,
    nombre: '',
    categoria: {nombre: '' },
    descripcion: '',
    imagen: '',
    region: '',
    estacion: '',
    temperatura: 0,
    favorito: false
  };
  categorias: CategoriaCultivo[] = [];

  // Form fields
  nombre: string = '';
  cat: string = '';
  descripcion: string = '';
  imagen!: File;
  region: string = '';
  estacion: string = '';
  temperatura: string = '';

  vistaPreviaUrl: any;

  constructor(
    private cultivosService: CultivosService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.cultivosService.detail(id).subscribe(
      data => {
        this.cultivos = data;
        this.setFormData(data);
        console.log('Datos actualizados del cultivo:', data);

      },
      err => {
        alert('Error al traer el cultivo');
        this.router.navigate(['']);
      }
    );
    this.cultivosService.traerCategorias().subscribe(
      resp2 => {
        this.categorias = resp2;
      }
    );
  }

  setFormData(cultivo: Cultivo): void {
    this.nombre = cultivo.nombre;
    this.cat = cultivo.categoria.nombre ? cultivo.categoria.nombre.toString() : '';
    this.descripcion = cultivo.descripcion;
    this.region = cultivo.region;
    this.estacion = cultivo.estacion;
    this.temperatura = cultivo.temperatura.toString();
    this.vistaPreviaUrl = cultivo.imagen;
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.vistaPreviaUrl = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onUpdate(): void {
    // Construir el objeto de cultivo actualizado
    const updatedCultivo = {
      id: this.cultivos.id,
      nombre: this.nombre,
      categoria: { nombre: this.cat },
      descripcion: this.descripcion,
      region: this.region,
      estacion: this.estacion,
      temperatura: parseFloat(this.temperatura),
      favorito: this.cultivos.favorito
    };
  
    // Si hay una imagen seleccionada, agregarla al objeto FormData
    const formData = new FormData();
    if (this.imagen) {
      formData.append('imagen', this.imagen, this.imagen!.name);
    }
  
    // Agregar el objeto de cultivo actualizado como una cadena JSON al FormData
    formData.append('cultivo', JSON.stringify(updatedCultivo));


    console.log('Datos actualizados del cultivo:', formData);
  
    const id = this.activatedRouter.snapshot.params['id'];
    this.cultivosService.update(id, formData).subscribe(
      data => {
        this.router.navigate(['/administrarCultivos']);
        Swal.fire({
          title: "Cultivo modificado exitosamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1500})
        setTimeout(()=>{
          this.router.navigate(['/administrarCultivos']);
        }, 1500);
      },
      err => {
        Swal.fire({
          title: "Error al modificar el cultivo",
          icon: "error",
          showConfirmButton: false,
          timer: 1500})
        setTimeout(()=>{
          this.router.navigate(['/administrarCultivos']);
        }, 1500);
        
      }
    );
  }
  
}
