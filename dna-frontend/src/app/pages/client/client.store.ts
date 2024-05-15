import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Client } from 'app/core/models/client.model';
import { ProfilesService } from 'app/core/services/profiles.service';
import { ClientState, initialClientState } from 'app/states/client.state';
import { exhaustMap, tap } from 'rxjs';

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

  readonly getClient = this.effect(trigger$ => {
    return trigger$.pipe(
      tap(() => {
        this.setIsLoading();
      }),
      exhaustMap(() =>
        this.profilesService.getClient().pipe(
          tapResponse(
            client => this.setClient(client),
            (err: HttpErrorResponse) => this.setError(err)
          )
        )
      )
    );
  });

  readonly putClient = this.effect(trigger$ => {
    return trigger$.pipe(
      tapResponse(
        () => {
          this.profilesService.putClient();
        },
        (err: HttpErrorResponse) => this.setError(err)
      )
    );
  });

  constructor(private profilesService: ProfilesService) {
    super(initialClientState);
  }
}
