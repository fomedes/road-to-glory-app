import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferPipe',
})
export class transferPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'purchase') {
      return 'comprado';
    }
    return 'vendido';
  }
}
