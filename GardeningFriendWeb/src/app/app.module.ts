import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { CultivosComponent } from './enciclopedia/cultivos/cultivos.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ConvertDaysToPipe } from './pipes/convert-days-to.pipe';
import { HomeComponent } from './home/home.component';
import { ConsejosComponent } from './consejos/consejos.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MiCuentaComponent } from './auth/mi-cuenta/mi-cuenta.component';
import { FavoritosComponent } from './enciclopedia/favoritos/favoritos.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },//el canActivate va en las rutas que requieren autenticacion
  { path: 'cultivos', component: CultivosComponent },
  { path: 'consejo', component: ConsejosComponent },
  // { path: 'tienda', component: LayoutTiendaComponent, canActivate: [AuthGuard] },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'micuenta', component: MiCuentaComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HeaderComponent,
    CultivosComponent,
    FilterPipe,
    ConvertDaysToPipe,
    HomeComponent,
    ConsejosComponent,
    LoginComponent,
    RegistroComponent,
    MiCuentaComponent,
    FavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
