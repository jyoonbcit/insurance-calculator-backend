import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nonNegative',
  standalone: true,
})
export class NonNegativePipe implements PipeTransform {
  transform(value: number): number {
    return value < 0 ? 0 : value;
  }
}
