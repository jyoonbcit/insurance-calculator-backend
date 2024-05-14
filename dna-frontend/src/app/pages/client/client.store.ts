import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { CA_PROVINCES } from 'app/core/enums/ca-provinces.enum';
import { ProfilesService } from 'app/core/services/profiles.service';
import { Observable, exhaustMap, tap } from 'rxjs';

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
  isLoading: boolean;
  error: string | null;
  client: Client;
}

@Injectable()
export class ClientStore extends ComponentStore<ClientState> {
  private isLoading$ = this.select(state => state.isLoading);
  private error$ = this.select(state => state.error);
  private client$ = this.select(state => state.client);

  vm$ = this.select({
    error: this.error$,
    client: this.client$,
  });

  setIsLoading = this.updater(state => ({
    ...state,
    isLoading: true,
  }));

  setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    isLoading: false,
    error: error.message,
  }));

  setClient = this.updater((state, client: Client) => ({
    ...state,
    isLoading: false,
    client,
  }));

  getClient = this.effect(trigger$ => {
    return trigger$.pipe(
      tap(() => {
        this.setIsLoading();
      }),
      exhaustMap(() => {
        return this.profilesService.getClient().pipe(
          tapResponse(
            client => this.setClient(client),
            (err: HttpErrorResponse) => this.setError(err)
          )
        );
      })
    );
  });

  putClient = this.effect((client$: Observable<Client>) => {
    return client$.pipe(
      tap(() => {
        this.setIsLoading();
      }),
      exhaustMap(() => {
        return this.profilesService.putClient().pipe(
          tapResponse(
            client => this.setClient(client),
            (err: HttpErrorResponse) => this.setError(err)
          )
        );
      })
    );
  });

  constructor(private profilesService: ProfilesService) {
    super({
      isLoading: false,
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
