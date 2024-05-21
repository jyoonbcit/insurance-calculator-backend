import { NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiNotificationModule } from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputSliderModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { CalculatorComponent } from '../calculator/calculator.component';
import { MultiValueCardComponent } from 'app/core/components/multi-value-card/multi-value-card.component';

@Component({
  selector: 'app-total-needs',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputSliderModule,
    TuiTabsModule,
    TuiNotificationModule,
    NgIf,
    MultiValueCardComponent,
    CalculatorComponent,
  ],
  templateUrl: './total-needs.component.html',
  styleUrl: './total-needs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalNeedsComponent {
  activeItemIndex = 0;

  readonly totalNeedsForm = new FormGroup({
    needs: new FormArray([]),
  });

  get needs(): FormArray {
    return this.totalNeedsForm.get('needs') as FormArray;
  }

  createNeed(): FormGroup {
    return new FormGroup({
      priority: new FormControl(),
      want: new FormControl(),
    });
  }

  addNeed() {
    this.needs.push(this.createNeed());
  }

  removeNeed(index: number) {
    this.needs.removeAt(index);
  }

  testValues = [
    { label: 'Need', value: '$5,000,000' },
    { label: 'Want', value: '$2,000,000' },
  ];
}
