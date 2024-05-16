import { NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
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
import { ValueCardComponent } from 'app/core/components/value-card/value-card.component';
import { CalculatorComponent } from '../calculator/calculator.component';

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
    TuiTabsModule,
    NgIf,
    ValueCardComponent,
    CalculatorComponent,
  ],
  templateUrl: './total-needs.component.html',
  styleUrl: './total-needs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalNeedsComponent {
  activeItemIndex = 0;
}
