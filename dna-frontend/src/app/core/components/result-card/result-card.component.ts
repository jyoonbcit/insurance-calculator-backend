import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiIslandModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [TuiIslandModule, NgClass],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.scss',
})
export class ResultCardComponent {
  @Input() header: string = '';
  @Input() result: string = '';
  @Input() compact: boolean = false;
}
