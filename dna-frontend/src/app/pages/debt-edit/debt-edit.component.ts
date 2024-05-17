import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListModule,
  TuiNotificationModule,
  TuiButtonModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputDateModule,
  TuiInputNumberModule,
  TuiInputSliderModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiTabsModule,
  TuiCheckboxBlockModule,
} from '@taiga-ui/kit';
import { HorizontalDividerComponent } from 'app/core/components/horizontal-divider/horizontal-divider.component';
import { LineChartComponent } from 'app/core/components/line-chart/line-chart.component';
import { ValueCardComponent } from 'app/core/components/value-card/value-card.component';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-debt-edit',
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
    TuiCheckboxBlockModule,
    TuiButtonModule,
    HorizontalDividerComponent,
    NgIf,
    ValueCardComponent,
    CalculatorComponent,
    LineChartComponent,
  ],
  templateUrl: './debt-edit.component.html',
  styleUrl: './debt-edit.component.scss',
})
export class DebtEditComponent {}
