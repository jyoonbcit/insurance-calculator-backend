import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { CA_PROVINCES } from 'app/core/enums/ca-provinces.enum';

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

  vm$ = this.clientStore.vm$;

  readonly provinceOptions = Object.values(CA_PROVINCES);

  readonly clientForm = new FormGroup({
    name: new FormControl(),
    birthdate: new FormControl(),
    province: new FormControl(),
    annualIncome: new FormControl(),
    incomeReplacementMultiplier: new FormControl(),
    selectedBracket: new FormControl(),
    expectedRetirementAge: new FormControl(),
  });

  constructor(private readonly clientStore: ClientStore) {}

  ngOnInit(): void {
    this.clientStore.getClient();
    this.clientForm.valueChanges.subscribe(formData => {
      this.clientStore.setClient(formData as Client);
    });
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
