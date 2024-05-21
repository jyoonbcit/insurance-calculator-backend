import { CA_PROVINCES } from '../enums/ca-provinces.enum';

export interface TaxBracket {
  minIncome: number;
  taxRate: number;
  dividendEligible: number;
  dividendNonEligible: number;
}

export type ProvinceTaxBrackets = {
  [province in CA_PROVINCES]: TaxBracket[];
};
