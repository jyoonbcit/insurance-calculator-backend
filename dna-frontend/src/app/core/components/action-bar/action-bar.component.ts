import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [TuiButtonModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.scss',
})
export class ActionBarComponent {
  @Input() leftButtonLabel = 'Cancel';
  @Input() rightButtonLabel = 'Save';

  @Output() leftButtonClick = new EventEmitter();
  @Output() rightButtonClick = new EventEmitter();
}
