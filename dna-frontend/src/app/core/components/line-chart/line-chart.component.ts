import { Component, Input } from '@angular/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiLineChartModule } from '@taiga-ui/addon-charts';
import { TuiPoint } from '@taiga-ui/core';
import { HorizontalDividerComponent } from '../horizontal-divider/horizontal-divider.component';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [TuiIslandModule, TuiLineChartModule, HorizontalDividerComponent],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent {
  @Input() header: string = '';

  @Input() value: TuiPoint[] = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];
}
