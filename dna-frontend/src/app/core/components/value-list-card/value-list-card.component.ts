import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiElasticContainerModule, TuiIslandModule } from '@taiga-ui/kit';
import { Value } from 'app/core/models/value.model';

@Component({
  selector: 'app-value-list-card',
  standalone: true,
  imports: [TuiIslandModule, TuiElasticContainerModule, NgFor],
  templateUrl: './value-list-card.component.html',
  styleUrl: './value-list-card.component.scss',
})
export class ValueListCardComponent {
  @Input() header: string = '';
  @Input() values: Value[] = [];
}
