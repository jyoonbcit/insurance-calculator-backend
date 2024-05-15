import { CA_PROVINCES } from '../enums/ca-provinces.enum';
import { Bracket } from './bracket.model';

export interface Client {
  name: string;
  birthdate: string;
  province: CA_PROVINCES;
  annualIncome: number;
  incomeReplacementMultiplier: number;
  selectedBracket: Bracket;
  expectedRetirementAge: number;
}
