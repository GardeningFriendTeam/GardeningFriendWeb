import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarCategoriaCultivoComponent } from './admin/CRUD/editar-categoria-cultivo/editar-categoria-cultivo.component';
import { CategoriaCultivo } from './models/categoriaCultivo';
import { VerCategoriaCultivoComponent } from './admin/CRUD/ver-categoria-cultivo/ver-categoria-cultivo.component';
import { EditarCultivoComponent } from './admin/CRUD/editar-cultivo/editar-cultivo.component';
const routes: Routes = [
  {path: 'editarCategoriaCultivo/:id', component: EditarCategoriaCultivoComponent},
  {path: 'editarCultivo/:id', component: EditarCultivoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
