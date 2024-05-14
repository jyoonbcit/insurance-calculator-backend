import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CA_PROVINCES } from 'app/core/enums/ca-provinces.enum';

export interface Bracket {
  minIncome: number;
  taxRate: number;
  dividendEligible: number;
  dividendNonEligible: number;
}

export interface Client {
  name: string;
  birthdate: string;
  province: CA_PROVINCES;
  annualIncome: number;
  incomeReplacementMultiplier: number;
  selectedBracket: Bracket;
  expectedRetirementAge: number;
}

export interface ClientState {
  error: string | null;
  client: Client;
}

@Injectable()
export class ClientStore extends ComponentStore<ClientState> {
  private error$ = this.select(state => state.error);
  private client$ = this.select(state => state.client);

  vm$ = this.select({
    error: this.error$,
    client: this.client$,
  });

  constructor() {
    super({
      error: null,
      client: {
        name: '',
        birthdate: '',
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
    });
  }
}
