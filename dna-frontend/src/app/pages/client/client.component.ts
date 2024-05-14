import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
export class ClientComponent {
  activeItemIndex = 0;

  vm$ = this.clientStore.vm$;

  constructor(private clientStore: ClientStore) {}
}
