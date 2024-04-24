import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDaysTo'
})
export class ConvertDaysToPipe implements PipeTransform {

  transform(value: number): string {
    //Se crea las constantes
    const daysInMonth = 30;
    const daysInWeek = 7;

    //Se calcula según el valor los meses, semanas y días
    const months = Math.floor(value / daysInMonth);
    const weeks = Math.floor((value % daysInMonth) / daysInWeek);
    const days = value % daysInWeek;

    //Se almacena el resultado
    let result = '';

    //Se comprueba si hay más de cada uno
    if (months > 0) {
      result += `${months} mes${months > 1 ? 'es' : ''} `;
    }
    if (weeks > 0) {
      result += `${weeks} semana${weeks > 1 ? 's' : ''} `;
    }
    if (days > 0) {
      result += `${days} día${days > 1 ? 's' : ''}`;
    }

    //Se retorna el resultado
    return result.trim();
  }


}
