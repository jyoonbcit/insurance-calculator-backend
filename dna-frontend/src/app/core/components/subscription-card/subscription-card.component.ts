import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiIslandModule, TuiElasticContainerModule } from '@taiga-ui/kit';
import { HorizontalDividerComponent } from '../horizontal-divider/horizontal-divider.component';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-subscription-card',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiIslandModule,
    TuiElasticContainerModule,
    NgIf,
    NgFor,
    HorizontalDividerComponent,
  ],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.scss',
})
export class SubscriptionCardComponent {
  expanded = false;

  // Takes in an array of strings to display as list content (before expanding)
  @Input() content = [
    'Unlimited access to the Dynamic Needs Analysis calculator',
    'Unlimited access to the AI-powered Robo-Advisor',
    'Write policies 80% faster',
  ];

  // Takes in an array of strings to display as list content (after expanding)
  @Input() extendedContent = [
    'Unlimited access to the Dynamic Needs Analysis calculator',
    'Unlimited access to the AI-powered Robo-Advisor',
    'Write policies 80% faster',
    'Other benefits...',
    'Even more benefits...',
    'And lastly, benefits...',
  ];

  current = this.content;

  toggle(): void {
    this.expanded = !this.expanded;
    this.current = this.expanded ? this.extendedContent : this.content;
  }
}
