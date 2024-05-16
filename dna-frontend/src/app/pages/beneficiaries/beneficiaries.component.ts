import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { TuiTabsModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [CalculatorComponent, TuiTabsModule],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeneficiariesComponent {
  activeItemIndex = 0;
}
