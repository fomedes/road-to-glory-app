import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCurrency',
  standalone: true,
})
export class ToCurrencyPipe implements PipeTransform {
  transform(
    value: number | undefined | null,
    currency: string = 'EUR'
  ): string {
    if (value === undefined || value === null) {
      return '';
    }
    const stringValue = value.toString();
    const parts = stringValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (parts.length > 1) {
      const decimalPart = parts[1];
      return `${integerPart}.${decimalPart}`;
    }

    if (currency === 'EUR') {
      return integerPart.concat(' €');
    }

    return integerPart;
  }
}
