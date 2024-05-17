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
    birthdate: null,
    province: null,
    annualIncome: null,
    incomeReplacementMultiplier: null,
    expectedRetirementAge: null,
  },
};
