import { Pipe, PipeTransform } from '@angular/core';
import { Cultivo } from '../enciclopedia/cultivos/cultivos.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(cultivos: Cultivo[], name: string): Cultivo[] {
    if (!cultivos) return [];
    if (!name) return cultivos;
    name = name.toLowerCase();
    return cultivos.filter(cultivo => cultivo.nombre.toLowerCase().includes(name));
  }

}
