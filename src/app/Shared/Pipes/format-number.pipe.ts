import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber',
})
export class formatNumberPipe implements PipeTransform {
  transform(value: number): string {
    const stringValue = value.toString();
    const parts = stringValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (parts.length > 1) {
      const decimalPart = parts[1];
      return `${integerPart}.${decimalPart}`;
    }

    return integerPart;
  }
}
