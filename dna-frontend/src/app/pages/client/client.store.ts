import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TuiDay } from '@taiga-ui/cdk';
import { Client } from 'app/core/models/client.model';
import { SupabaseService } from 'app/core/services/supabase.service';
import { ClientState, initialClientState } from 'app/states/client.state';
import { take } from 'rxjs';

@Injectable()
export class ClientStore extends ComponentStore<ClientState> {
  readonly isLoading$ = this.select(state => state.isLoading);
  readonly error$ = this.select(state => state.error);
  readonly client$ = this.select(state => state.client);

  readonly vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
    client: this.client$,
  });

  readonly setIsLoading = this.updater(state => ({
    ...state,
    isLoading: true,
  }));

  readonly setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    isLoading: false,
    error: error.message,
  }));

  readonly setClient = this.updater((state, client: Client) => ({
    ...state,
    isLoading: false,
    client,
  }));

  constructor(private supabaseService: SupabaseService) {
    super(initialClientState);
  }

  getClient(clientId: number) {
    this.supabaseService.getClient(clientId).then(response => {
      if (response.error) {
        throw response.error;
      } else {
        if (response.data.client !== null) {
          response.data.client.birthdate = TuiDay.fromUtcNativeDate(
            new Date(response.data.client.birthdate)
          );
          this.setClient(response.data.client);
        }
      }
    });
  }

  updateClient(clientId: number) {
    this.client$.pipe(take(1)).subscribe(client => {
      this.supabaseService.updateClient(clientId, client).then(response => {
        if (response.error) {
          throw response.error;
        }
      });
    });
  }
}
