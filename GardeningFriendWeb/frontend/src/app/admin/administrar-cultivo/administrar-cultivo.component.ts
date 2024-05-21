import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cultivo } from './../../enciclopedia/cultivos/cultivos.model';
import { CultivosService } from '../../services/cultivos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaCultivo } from 'src/app/models/categoriaCultivo';


@Component({
    selector: 'app-administrar-cultivo',
    styleUrls: ['./administrar-cultivo.component.scss'],
    templateUrl: './administrar-cultivo.component.html'
})
export class AdministrarCultivoComponent implements OnInit{ 
  activeInfo:boolean = false;
  filterForm: FormGroup = this.fb.group({tipo: ''});
  cultivos: any = {};
  categorias: any = {};
  cultivosCat: any = {};
  catSelec: any = {};
  infoCultivos: Cultivo[] = [];
  activeCover:boolean = false;  

  constructor(private cultivosService:CultivosService, private fb:FormBuilder, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.params['id'];
    console.log(id);
    if (id > 0) {
      
      this.cultivosService.detailCat(id).subscribe(
        data => {
          this.cultivos = data;
          console.log(data);
        }, err => {
          alert("Error al cargar");
          this.router.navigate(['/administrarCultivos']);
        }
      )
    }
    else {
      this.cultivosService.traerCultivos().subscribe(resp => {
        this.cultivos = resp;
      })

    }
    this.cultivosService.categoria(id).subscribe(
      data2 => {
        this.catSelec = data2;

      })
    this.cultivosService.traerCategorias().subscribe(resp2 => {
      this.categorias = resp2;

    })
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

  delete(item:any){
    this.cultivos.forEach((cultivo: any) => {
          if (cultivo.id == item.id) {
            this.cultivosService.delete(item.id).subscribe(
                res=>this.cultivosService.traerCultivos().subscribe(
                Response=>this.cultivos=Response
                )
            );
            console.log('borre el cultivo con id :'+item.id);
          }
        });
  }
}

