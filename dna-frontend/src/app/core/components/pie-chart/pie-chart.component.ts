import { Component, Input } from '@angular/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [TuiIslandModule, TuiPieChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  @Input() header: string = '';
  @Input() value = [40, 30, 20, 10];
}
