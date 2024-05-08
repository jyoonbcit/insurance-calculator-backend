import { Component } from '@angular/core';
import { LandingCardComponent } from 'app/core/components/landing-card/landing-card.component';
import { LineChartComponent } from 'app/core/components/line-chart/line-chart.component';
import { ValueCardComponent } from 'app/core/components/value-card/value-card.component';
import { SubscriptionCardComponent } from 'app/core/components/subscription-card/subscription-card.component';
import { MultiValueCardComponent } from 'app/core/components/multi-value-card/multi-value-card.component';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [
    SubscriptionCardComponent,
    LandingCardComponent,
    ValueCardComponent,
    MultiValueCardComponent,
    LineChartComponent,
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
})
export class TestPageComponent {
  valueCard1 = { label: 'Age', value: '25' };
  valueCard2 = {
    label: 'Amount Insured for Income ($CAD)',
    value: '$1,000,000',
  };
  valueCards = [
    { label: 'Need', value: '$5,000,000' },
    { label: 'Want', value: '$2,000,000' },
  ];
}
