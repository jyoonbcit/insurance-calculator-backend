import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, tuiNumberFormatProvider } from '@taiga-ui/core';
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
import { TUI_DATE_FORMAT, TUI_DATE_SEPARATOR, TuiDay } from '@taiga-ui/cdk';
import { BirthDateAgePipe } from 'app/shared/pipes/age.pipe';
import { NonNegativePipe } from 'app/shared/pipes/non-negative.pipe';

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
    ValueCardComponent,
    TuiTabsModule,
    NgIf,
    AsyncPipe,
    CurrencyPipe,
    BirthDateAgePipe,
    NonNegativePipe,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [
    ClientStore,
    tuiNumberFormatProvider({
      decimalSeparator: '.',
      thousandSeparator: ',',
    }),
    { provide: TUI_DATE_FORMAT, useValue: 'YMD' },
    { provide: TUI_DATE_SEPARATOR, useValue: '/' },
  ],
})
export class ClientComponent implements OnInit, OnDestroy {
  activeItemIndex = 0;
  vm$ = this.clientStore.vm$;
  readonly provinceOptions = Object.values(CA_PROVINCES);
  readonly maxDate = TuiDay.currentLocal();
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
}
