import { Component } from '@angular/core';
import { Cultivo } from './cultivos.model';
import { CultivosService } from '../../services/cultivos.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cultivos',
  templateUrl: './cultivos.component.html',
  styleUrls: ['./cultivos.component.scss']
})
export class CultivosComponent {
  //Modales en false
  activeAlert:boolean = false;
  activeCover:boolean = false;
  activeInfo:boolean = false;

  alertText:string = '';
  
  cultivos: Cultivo[] = [
    // {
    //   id_cultivo: 1,
    //   nombre: "Tomate",
    //   categoria: "frutal",
    //   descripcion: "un tomate rojo",
    //   imagen: "./assets/cultivos/tomate.png",
    //   region: "norte",
    //   estacion_de_siembra: "primavera",
    //   temperatura_recomendada: 25.0,
    //   favorito: true,
    //   usuario: 1
    // }
  ];

  infoCultivos: Cultivo[] = [];

  tipos = ['Todas', 'Vegetal', 'Frutal', 'Aromática'];
  filterForm: FormGroup = this.fb.group({tipo: ''});

  //El ngModel junto con el pipe filter que se creo podemos buscar por nombre
  searchName: string = '';

  constructor(private cultivosService:CultivosService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.cultivosService.listCultivos().subscribe((data: Cultivo[]) => {
      this.cultivos = data;
      console.log(this.cultivos);
    })

    //Por defecto se mostrara todos los cultivos
    this.filterForm = this.fb.group({
      tipo: ['Todas'],
    });
  }


  get filteredCultivos() {
    //Obtiene el valor de tipo
    const tipo = this.filterForm.get('tipo')?.value;
    //Si tipo es Todas mostrara todos los cultivos
    if (tipo === 'Todas') {
      return this.cultivos;
    } else {
      //Si no mostrara el tipo de cultivo que se haya seleccionado
      return this.cultivos.filter(cultivo => cultivo.categoria === tipo);
    }
  }

  //Activa o desactiva la alerta
  showAlert(){
    this.activeAlert = !this.activeAlert;
    this.activeCover = !this.activeCover;
  }

  //Comprueba si el cultivo esta en favoritos y si no lo agrega
  addToFavorito(cultivo: Cultivo) {
    const alreadyInFavorites = this.cultivosService.getFavorites().some(fav => fav.id_cultivo === cultivo.id_cultivo);
    if (!alreadyInFavorites) {
      this.cultivosService.addToFavorites(cultivo);
      this.alertText = 'El Cultivo fue agregado en Favoritos';
    } else {
      this.alertText = 'El Cultivo ya se encuentra en Favoritos';
    }
    this.activeAlert = !this.activeAlert;
    this.activeCover = !this.activeCover;
  }


  // muestra la información agregando el cultivo a infoCultivo
  showInfo(info:Cultivo){
    this.infoCultivos.push(info);
    this.activeInfo = !this.activeInfo;
    this.activeCover = !this.activeCover;
  }
  //Cierra la información y elimina el cultivo de infoCultivo
  toggleInfo(){
    this.infoCultivos.splice(0);
    this.activeInfo = !this.activeInfo;
    this.activeCover = !this.activeCover;
    console.log(this.activeInfo)
  }
}
