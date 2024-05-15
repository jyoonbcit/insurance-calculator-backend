import { CA_PROVINCES } from '../enums/ca-provinces.enum';
import { Bracket } from './bracket.model';

export interface Client {
  name: string | null | undefined;
  birthdate: string | null | undefined;
  province: CA_PROVINCES | null | undefined;
  annualIncome: number | null | undefined;
  incomeReplacementMultiplier: number | null | undefined;
  selectedBracket: Bracket | null | undefined;
  expectedRetirementAge: number | null | undefined;
}
