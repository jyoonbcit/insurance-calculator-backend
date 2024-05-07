import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiIslandModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-value-card',
  standalone: true,
  imports: [TuiIslandModule, NgClass],
  templateUrl: './value-card.component.html',
  styleUrl: './value-card.component.scss',
})
export class ValueCardComponent {
  @Input() header: string = '';
  @Input() value: string = '';
  @Input() compact: boolean = false;
}
