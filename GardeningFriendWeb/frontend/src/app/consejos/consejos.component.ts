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
      categoria: '¿Dónde Plantar?'
    },
    {
      image: '../../assets/consejos/como-empezar-huerto.jpg.webp',
      titulo: 'Cinco claves para empezar un huerto.',
      subtitulo: 'Si te estás planteando descubrir los beneficios de disfrutar de sabores de verdad, es momento de aprender cómo empezar un huerto.',
      link: 'https://verdecora.es/blog/cinco-claves-empezar-huerto-2',
      categoria: '¿Qué Plantar?'
    },
    {
      image: '../../assets/consejos/inta.jpg',
      titulo: 'Mi Primera Huerta: Consejos para iniciar el cultivo de hortalizas.',
      subtitulo: 'Del sustrato al riego, hay varios secretos para que la huerta urbana se convierta en un éxito.',
      link: 'https://inta.gob.ar/noticias/mi-primera-huerta-consejos-para-iniciar-el-cultivo-de-hortalizas',
      categoria: '¿Dónde Plantar?'
    },
    {
      image: '../../assets/consejos/vegetales.jpg',
      titulo: 'Huerta de primavera: consejos esenciales para principiantes.',
      subtitulo: 'Te enseñamos a plantar en maceta y en jardín, para que llenes de vida y color tu hogar.',
      link: 'https://www.clarin.com/familias/huerta-primavera-consejos-esenciales-principiantes_0_pLzMfyMJo.html',
      categoria: '¿Cómo Plantar?'
    },
    {
      image: '../../assets/consejos/huerta3.webp',
      titulo: '9 pasos para construir una huerta en tu casa.',
      subtitulo: 'Un manual sencillo para aprender a cultivar tus alimentos en el balcón, terraza o jardín.',
      link: 'https://news.agrofy.com.ar/noticia/174725/9-pasos-construir-huerta-tu-casa',
      categoria: '¿Cómo Plantar?'
    },

    {
      image: '../../assets/consejos/huerta.jpg',
      titulo: 'La huerta en casa en otoño invierno.',
      subtitulo: 'Recomendaciones por especies para su aprovechamiento y manejo agroecológico.',
      link: 'https://inta.gob.ar/noticias/la-huerta-en-casa-en-otono-invierno',
      categoria: '¿Qué Plantar?'
    },
    /*prueba*/
    {
      image: "../../assets/consejos/huerta_urbana.jpg",
      titulo: "Diez consejos para armar tu huerta urbana en invierno: ¿Qué plantar y cómo hacerlo?",
      subtitulo: "Consejos para armar una huerta urbana en invierno, incluyendo qué plantar y cómo hacerlo.",
      link: "https://buenosaires.gob.ar/noticias/diez-consejos-para-armar-tu-huerta-urbana-en-invierno-que-plantar-y-como-hacerlo",
      categoria: "¿Dónde Plantar?"
    },
    {
      image: "../../assets/consejos/sembrar.webp",
      titulo: "Cultivos para la huerta: ¿Qué podemos sembrar en Argentina durante noviembre (primavera)?",
      subtitulo: "Lista de cultivos recomendados para sembrar en Argentina durante noviembre, en primavera.",
      link: "https://www.meteored.com.ar/noticias/actualidad/cultivos-para-la-huerta-que-podemos-sembrar-en-argentina-durante-noviembre-primavera.html",
      categoria: "¿Qué Plantar?"
    },
    {
      image: "../../assets/consejos/4pasos.jpg",
      titulo: "Mi huerta en 4 pasos",
      subtitulo: "Guía para crear y cuidar una huerta en cuatro pasos sencillos.",
      link: "https://www.mihuerta.org.ar/mi-huerta-en-4-pasos/",
      categoria: "¿Cómo Plantar?"
    },
    {
      image: "../../assets/consejos/FH.jpg",
      titulo: "Cómo hacer tu propia huerta",
      subtitulo: "Instrucciones paso a paso para crear tu propia huerta en casa.",
      link: "https://ambiente.cba.gov.ar/como-hacer-tu-propia-huerta/",
      categoria: "¿Cómo Plantar?"
    },
    {
      image: "../../assets/consejos/que-sembrar-en-febrero.jpg",
      titulo: "Qué sembrar en febrero en tu huerta para que crezca fabulosa",
      subtitulo: "Lista de cultivos recomendados para sembrar en febrero en tu huerta.",
      link: "https://www.fecoagro.com.ar/que-sembrar-en-febrero-en-tu-huerta-para-que-crezca-fabulosa/",
      categoria: "¿Qué Plantar?"
    },
    {
      image: "../../assets/consejos/clarin.jpg",
      titulo: "Calendario de siembra para la huerta urbana 2023: ¿Qué sembrar en cada mes del año?",
      subtitulo: "Calendario de siembra para la huerta urbana, indicando qué sembrar en cada mes del año.",
      link: "https://www.clarin.com/familias/huerta-urbana-2023-calendario-siembra-ano_0_JqUNL4mSOJ.html",
      categoria: "¿Dónde Plantar?"
    }
  ]

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
    const categoriasUnicas: string[] = ['Todas', '¿Dónde Plantar?', '¿Cómo Plantar?', '¿Qué Plantar?']; // Agregar las categorías
    return categoriasUnicas;
  }
}