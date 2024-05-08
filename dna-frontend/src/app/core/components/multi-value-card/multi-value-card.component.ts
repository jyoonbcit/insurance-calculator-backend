import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { Value } from 'app/core/models/value.model';

@Component({
  selector: 'app-multi-value-card',
  standalone: true,
  imports: [TuiIslandModule, NgClass, NgFor],
  templateUrl: './multi-value-card.component.html',
  styleUrl: './multi-value-card.component.scss',
})
export class MultiValueCardComponent {
  @Input() header: string = '';
  @Input() values: Value[] = [];
  @Input() compact: boolean = false;
}
