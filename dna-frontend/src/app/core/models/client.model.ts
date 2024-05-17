import { TuiDay } from '@taiga-ui/cdk';
import { CA_PROVINCES } from '../enums/ca-provinces.enum';

export interface Client {
  name: string | null;
  birthdate: TuiDay | Date | null;
  province: CA_PROVINCES | null;
  annualIncome: number | null;
  incomeReplacementMultiplier: number | null;
  expectedRetirementAge: number | null;
}
