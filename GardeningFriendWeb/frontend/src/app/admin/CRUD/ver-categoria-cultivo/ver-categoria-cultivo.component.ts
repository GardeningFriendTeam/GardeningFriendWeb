import { Component, OnInit } from '@angular/core';
import { CategoriaCultivoService } from 'src/app/services/categoria-cultivo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-categoria-cultivo',
  templateUrl: './ver-categoria-cultivo.component.html',
  styleUrls: ['./ver-categoria-cultivo.component.scss']
})
export class VerCategoriaCultivoComponent implements OnInit{

  miCat:any;

  constructor(private categoriaCultivoService: CategoriaCultivoService, private activatedRoute: ActivatedRoute, private router: Router){

  }

ngOnInit(): void {
    this.categoriaCultivoService.obtenerCategorias().subscribe({
      next:(categoriasTodas)=>{
        this.miCat=categoriasTodas;
        console.log(" Exito se cargo las categorías");
      },
      error:(errorData)=> {
        console.log("error del componenete categoría ");
        console.error(errorData);
        this.router.navigate(['']);
      }
    })
  

   


  }

  delete(item:any){
    this.miCat.forEach((categoria: any) => {
          if (categoria.id == item.id) {
            this.categoriaCultivoService.delete(item.id).subscribe(
                res=>this.categoriaCultivoService.obtenerCategorias().subscribe(
                Response=>this.miCat=Response
                )
            );
            console.log('borre la categoria numero :'+item.id);
          }
        });
  }

  

}
