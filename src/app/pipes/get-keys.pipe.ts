import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getKeys',
  standalone: true,
})
export class GetKeysPipe implements PipeTransform {
  transform(value: { [key: string]: any }): string[] {
    return Object.keys(value);
  }
}
