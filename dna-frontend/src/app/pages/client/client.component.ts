import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule } from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { AppbarComponent } from 'app/core/components/appbar/appbar.component';
import { ValueCardComponent } from 'app/core/components/value-card/value-card.component';
import { ClientStore } from './client.store';
import { Client } from 'app/core/models/client.model';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputNumberModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    AppbarComponent,
    TuiTabsModule,
    NgIf,
    AsyncPipe,
    ValueCardComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [ClientStore],
})
export class ClientComponent implements OnInit, OnDestroy {
  activeItemIndex = 0;

  // Create the form here for the client fields

  vm$ = this.clientStore.vm$;

  constructor(private readonly clientStore: ClientStore) {}

  ngOnInit(): void {
    this.clientStore.getClient();
  }

  ngOnDestroy(): void {
    this.clientStore.putClient();
  }

  onBlur(): void {
    this.clientStore.putClient();
  }

  onUpdate(client: Client): void {
    this.clientStore.setClient(client);
  }
}
