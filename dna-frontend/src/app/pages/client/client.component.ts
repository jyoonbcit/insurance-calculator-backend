import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { Client, ClientStore } from './client.store';

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
export class ClientComponent implements OnInit {
  activeItemIndex = 0;

  // Create the form here for the client fields

  vm$ = this.clientStore.vm$;

  constructor(private clientStore: ClientStore) {}

  ngOnInit(): void {
    this.clientStore.getClient();
  }

  onUpdate(client: Client): void {
    this.clientStore.putClient(client);
  }

  // Modify on component destruction, call save to DB
}
