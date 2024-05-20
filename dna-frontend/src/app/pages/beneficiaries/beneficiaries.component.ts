import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { NgIf } from '@angular/common';
import { HorizontalDividerComponent } from 'app/core/components/horizontal-divider/horizontal-divider.component';
import { PieChartComponent } from 'app/core/components/pie-chart/pie-chart.component';
import { BarChartComponent } from 'app/core/components/bar-chart/bar-chart.component';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [
    CalculatorComponent,
    TuiTabsModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiButtonModule,
    NgIf,
    HorizontalDividerComponent,
    PieChartComponent,
    BarChartComponent,
  ],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeneficiariesComponent {
  activeItemIndex = 0;
}
