import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeTextPipe'
})
export class SanitizeTextPipePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\*/g, '').replace(/\./g, '.\n');
  }
}
