import { Pipe, PipeTransform } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

@Pipe({
  name: 'bdAge',
  standalone: true,
})
export class BirthDateAgePipe implements PipeTransform {
  /***
   * NOTE: Taiga UI's InputDate seems to be bugged to only return TuiDay even
   * with the Native Date directive enabled when using the [max] property.
   *
   * If this gets fixed in a future release, convert the entire function to only
   * use the native Date object instead of TuiDay.
   */

  transform(value: Date | TuiDay | null | undefined): number {
    if (!value) {
      return 0;
    }

    return this.calculateAge(value);
  }

  private calculateAge(birthdate: Date | TuiDay): number {
    const today = new Date();
    const birthDate =
      birthdate instanceof Date
        ? new Date(birthdate)
        : new Date(birthdate.year, birthdate.month, birthdate.day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
