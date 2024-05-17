import { Pipe, PipeTransform } from '@angular/core';
import { TaxBracket } from 'app/core/models/tax.model';

@Pipe({
  name: 'taxBracket',
  standalone: true,
})
export class TaxBracketPipe implements PipeTransform {
  transform(bracket: TaxBracket | null): string {
    if (!bracket) {
      return 'N/A';
    }
    return `$${bracket.minIncome}.00+`;
  }
}
