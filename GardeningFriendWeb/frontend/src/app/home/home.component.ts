import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
// array con informacion para interpolar:
  secciones = [
    {
      class: "cultivos",
      id: "cultivos",
      imagen: "../../assets/iconos/icono-cultivos.png",
      titulo: "CULTIVOS",
      descripcion: `En esta sección puedes acceder a instructivos sobre numerosos cultivos,
      los cuales te brindarán toda la información necesaria para comenzar a
      cultivar. Además, puedes monitorear en que etapa se encuentra el
      cultivo en la seccion "MI JARDÍN" (para acceder a esta ultima función
      debes estar registrado).`,
      link: "/cultivos"
    },

    {
      class: "ventas",
      id: "ventas",
      imagen: "../../assets/iconos/icono-ventas.png",
      titulo: "TIENDA",
      descripcion: ` Sección ecommerce del sitio.
      Basicamente en esta sección podrás conectar con otros usuarios
      que esten interesados en vender / comprar productos orgánicos (función solo disponible para usuarios
      registrados).`,
      link: "/tienda"
    },

    {
      class: "consejos",
      id: "consejos",
      imagen: "../../assets/iconos/icono-consejos.png",
      titulo: "CONSEJOS",
      descripcion: `Información extra de utilidad.
      En esta sección encontrarás una gran variedad de consejos que te
      pueden ayudar en tus proyectos y adentrarte en el mundo de los
      cultivos orgánicos. `,
      link: "/consejo"
    }
  ]
}
