import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaCultivoService } from 'src/app/services/categoria-cultivo.service';
import { CategoriaCultivo } from 'src/app/models/categoriaCultivo';

@Component({
  selector: 'app-agregar-categoria-cultivo',
  templateUrl: './agregar-categoria-cultivo.component.html',
  styleUrls: ['./agregar-categoria-cultivo.component.scss']
})
export class AgregarCategoriaCultivoComponent {

  nombre: string = "";

  constructor(private categoriaCultivoService: CategoriaCultivoService, private router: Router){

  }

  ngOnInit(): void { }

  create(): void{
    const categoria = new FormData();
    categoria.append('nombre',this.nombre)
    this.categoriaCultivoService.create(categoria).subscribe(
      data=>this.router.navigate(['/verCategoriaCultivo'])
    );
    console.log(categoria);
  }
}
