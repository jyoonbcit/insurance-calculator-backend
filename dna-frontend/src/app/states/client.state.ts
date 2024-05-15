import { CA_PROVINCES } from 'app/core/enums/ca-provinces.enum';
import { Client } from 'app/core/models/client.model';

export interface ClientState {
  isLoading: boolean;
  error: string | null;
  client: Client;
}

export const initialClientState: ClientState = {
  isLoading: false,
  error: null,
  client: {
    name: '',
    birthdate: new Date(),
    province: CA_PROVINCES.OTHER,
    annualIncome: 0,
    incomeReplacementMultiplier: 0,
    selectedBracket: {
      minIncome: 0,
      taxRate: 0,
      dividendEligible: 0,
      dividendNonEligible: 0,
    },
    expectedRetirementAge: 0,
  },
};
