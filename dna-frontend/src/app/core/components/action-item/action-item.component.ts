import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { TuiIslandModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-action-item',
  standalone: true,
  imports: [TuiIslandModule, TuiButtonModule, TuiSvgModule, NgIf],
  templateUrl: './action-item.component.html',
  styleUrl: './action-item.component.scss',
})
export class ActionItemComponent {
  @Input() label: string = '';
  @Input() actionLabel: string = '';
  @Input() canDelete: boolean = false;
}
