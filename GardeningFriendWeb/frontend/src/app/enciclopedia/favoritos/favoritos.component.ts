import { Component } from '@angular/core';
import { Cultivo } from '../cultivos/cultivos.model';
import { CultivosService } from '../../services/cultivos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent {
  activeAlert:boolean = false;
  activeCover:boolean = false;
  activeInfo:boolean = false;

  alertText:string = '';
  infoCultivos: Cultivo[] = [];

  constructor(private cultivosService:CultivosService) { }


  get cultivosToFavorito(): Cultivo[] {
    return this.cultivosService.getFavorites();
  }

  removeFavorito(index: number) {
    this.cultivosService.cultivoFavorito.splice(index, 1);
    this.alertText = 'El Cultivo se eliminó de Favoritos';
    this.activeCover = !this.activeCover;
    this.activeAlert = !this.activeAlert;
  }

  showAlert(){
    this.activeAlert = !this.activeAlert;
    this.activeCover = !this.activeCover;
  }

  showInfo(info:Cultivo){
    this.infoCultivos.push(info);
    this.activeInfo = !this.activeInfo;
    this.activeCover = !this.activeCover;
  }

  toggleInfo(){
    this.infoCultivos.splice(0);
    this.activeInfo = !this.activeInfo;
    this.activeCover = !this.activeCover;
  }
}
