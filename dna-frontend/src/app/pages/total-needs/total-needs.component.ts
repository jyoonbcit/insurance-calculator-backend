import { NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiNotificationModule } from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputSliderModule,
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
    TuiInputSliderModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiTabsModule,
    TuiNotificationModule,
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
