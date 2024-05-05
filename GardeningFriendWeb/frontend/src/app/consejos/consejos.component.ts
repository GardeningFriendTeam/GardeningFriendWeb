import { Component } from '@angular/core';

@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.component.html',
  styleUrls: ['./consejos.component.scss']
})
export class ConsejosComponent {
  consejos = [
    {
      image: '../../assets/consejos/tierra.jpg',
      titulo: 'Plantar en casa: paso a paso.',
      subtitulo: 'Te enseñamos a plantar en maceta y en jardín, para que llenes de vida y color tu hogar.',
      link: 'https://www.buenosaires.gob.ar/coronavirus/bienestar/plantar-en-casa-paso-paso',
      categoria: 'Donde Plantar'
    },
    {
      image: '../../assets/consejos/como-empezar-huerto.jpg.webp',
      titulo: 'Cinco claves para empezar un huerto.',
      subtitulo: 'Si te estás planteando descubrir los beneficios de disfrutar de sabores de verdad, es momento de aprender cómo empezar un huerto.',
      link: 'https://verdecora.es/blog/cinco-claves-empezar-huerto-2',
      categoria: 'Como Plantar'
    },
    {
      image: '../../assets/consejos/inta.jpg',
      titulo: 'Mi Primera Huerta: Consejos para iniciar el cultivo de hortalizas.',
      subtitulo: 'Del sustrato al riego, hay varios secretos para que la huerta urbana se convierta en un éxito.',
      link: 'https://inta.gob.ar/noticias/mi-primera-huerta-consejos-para-iniciar-el-cultivo-de-hortalizas',
      categoria: 'Que Plantar'
    },
    {
      image: '../../assets/consejos/vegetales.jpg',
      titulo: 'Huerta de primavera: consejos esenciales para principiantes.',
      subtitulo: 'Te enseñamos a plantar en maceta y en jardín, para que llenes de vida y color tu hogar.',
      link: 'https://www.clarin.com/familias/huerta-primavera-consejos-esenciales-principiantes_0_pLzMfyMJo.html',
      categoria: 'Donde Plantar'
    },
    {
      image: '../../assets/consejos/huerta3.webp',
      titulo: '9 pasos para construir una huerta en tu casa.',
      subtitulo: 'Un manual sencillo para aprender a cultivar tus alimentos en el balcón, terraza o jardín.',
      link: 'https://news.agrofy.com.ar/noticia/174725/9-pasos-construir-huerta-tu-casa',
      categoria: 'Donde Plantar'
    },
    {
      image: '../../assets/consejos/huerta.jpg',
      titulo: 'La huerta en casa en otoño invierno.',
      subtitulo: 'Recomendaciones por especies para su aprovechamiento y manejo agroecológico.',
      link: 'https://inta.gob.ar/noticias/la-huerta-en-casa-en-otono-invierno',
      categoria: 'Que Plantar'
    },

  ];

  consejosFiltrados: any[] = []; // Variable para almacenar los consejos filtrados

  constructor() {
    // Al iniciar, mostrar todos los consejos
    this.consejosFiltrados = this.consejos;
  }

  // Método para filtrar consejos por categoría
  filtrarPorCategoria(categoria: string) {
    if (categoria === 'Todas') {
      // Si se selecciona 'Todas', mostrar todos los consejos
      this.consejosFiltrados = this.consejos;
    } else {
      // Filtrar por la categoría seleccionada
      this.consejosFiltrados = this.consejos.filter(consejo => consejo.categoria === categoria);
    }
  }

  // Método para obtener todas las categorías únicas
  obtenerCategorias(): string[] {
    const categoriasUnicas: string[] = ['Todas', 'Donde Plantar', 'Como Plantar', 'Que Plantar']; // Agregar las categorías
    return categoriasUnicas;
  }
}
