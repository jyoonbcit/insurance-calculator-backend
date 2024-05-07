import { Component } from '@angular/core';
import { LandingCardComponent } from 'app/core/components/landing-card/landing-card.component';
import { ResultCardComponent } from 'app/core/components/result-card/result-card.component';
import { SubscriptionCardComponent } from 'app/core/components/subscription-card/subscription-card.component';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [
    SubscriptionCardComponent,
    LandingCardComponent,
    ResultCardComponent,
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
})
export class TestPageComponent {}
