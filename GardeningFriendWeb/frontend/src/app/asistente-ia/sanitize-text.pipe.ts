import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeText'
})
export class SanitizeTextPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\*/g, '').replace(/\./g, '.\n');
  }

}
