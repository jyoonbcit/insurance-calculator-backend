import { NgIf } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiButtonModule, TuiDataListModule } from '@taiga-ui/core';
import {
  TuiCheckboxBlockModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { HorizontalDividerComponent } from 'app/core/components/horizontal-divider/horizontal-divider.component';
import { HeaderBarComponent } from 'app/core/components/header-bar/header-bar.component';
import { ActionBarComponent } from 'app/core/components/action-bar/action-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiTabsModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiCheckboxBlockModule,
    HorizontalDividerComponent,
    NgIf,
    HeaderBarComponent,
    ActionBarComponent,
  ],
  templateUrl: './asset-edit.component.html',
  styleUrl: './asset-edit.component.scss',
})
export class AssetEditComponent {
  constructor(
    private router: Router,
    private zone: NgZone
  ) {}

  readonly assetEditInformationForm = new FormGroup({
    type: new FormControl(),
    assetName: new FormControl(),
    yearAcquired: new FormControl(),
    initialValue: new FormControl(),
    currentValue: new FormControl(),
    appreciationRate: new FormControl(),
    term: new FormControl(),
    taxable: new FormControl(),
    liquid: new FormControl(),
    toBeSold: new FormControl(),
    taxBracket: new FormControl(),
  });

  readonly assetEditBeneficiariesForm = new FormGroup({
    beneficiaries: new FormArray([]),
  });

  get beneficiaries(): FormArray {
    return this.assetEditBeneficiariesForm.get('beneficiaries') as FormArray;
  }

  createBeneficiary(): FormGroup {
    return new FormGroup({
      allocation: new FormControl(),
    });
  }

  addBeneficiary() {
    this.beneficiaries.push(this.createBeneficiary());
  }

  removeBeneficiary(index: number) {
    this.beneficiaries.removeAt(index);
  }

  activeItemIndex = 0;

  types = [
    'Cash',
    'Stocks',
    'Bonds',
    'Real Estate',
    'Mutual Funds',
    'Retirement Account',
    'Crypto',
    'Life Insurance',
  ];

  // TODO: Populate with brackets based on province
  taxBrackets = ['Populate me', 'with province tax data'];

  cancel() {
    this.zone.run(() => {
      this.router.navigate(['/assets']);
    });
  }

  save() {
    this.zone.run(() => {
      this.router.navigate(['/assets']);
    });
  }
}
