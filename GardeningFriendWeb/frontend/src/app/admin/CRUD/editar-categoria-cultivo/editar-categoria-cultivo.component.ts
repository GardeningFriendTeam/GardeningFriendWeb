import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaCultivoService } from 'src/app/services/categoria-cultivo.service';
import { CategoriaCultivo } from 'src/app/models/categoriaCultivo';

@Component({
  selector: 'app-editar-categoria-cultivo',
  templateUrl: './editar-categoria-cultivo.component.html',
  styleUrls: ['./editar-categoria-cultivo.component.scss']
})
export class EditarCategoriaCultivoComponent implements OnInit{
  categoriaCultivo : CategoriaCultivo = Object();
  
  constructor(private categoriaCultivoService: CategoriaCultivoService, private activatedRouter: ActivatedRoute, private router: Router){}

  ngOnInit(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.categoriaCultivoService.detail(id).subscribe(
      data=>{
        this.categoriaCultivo = data;
      },err =>{
        alert("Error al traer la categoría");
        this.router.navigate(['']);
      }
    )
  }


onUpdate(): void{
  const id = this.activatedRouter.snapshot.params['id'];
  this.categoriaCultivoService.update(id, this.categoriaCultivo).subscribe(
    data => {
      this.router.navigate(['/verCategoriaCultivo']);
    }, err =>{
      alert("Error al modificar la categoria");
      this.router.navigate(['']);
    }
  )
}

}
