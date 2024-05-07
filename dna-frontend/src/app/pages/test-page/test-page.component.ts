import { Component } from '@angular/core';
import { LandingCardComponent } from 'app/core/components/landing-card/landing-card.component';
import { LineChartComponent } from 'app/core/components/line-chart/line-chart.component';
import { ValueCardComponent } from 'app/core/components/value-card/value-card.component';
import { SubscriptionCardComponent } from 'app/core/components/subscription-card/subscription-card.component';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [
    SubscriptionCardComponent,
    LandingCardComponent,
    ValueCardComponent,
    LineChartComponent,
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
})
export class TestPageComponent {}
