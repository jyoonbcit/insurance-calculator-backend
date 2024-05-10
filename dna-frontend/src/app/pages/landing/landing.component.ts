import { Component } from '@angular/core';
import { LandingCardComponent } from 'app/core/components/landing-card/landing-card.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LandingCardComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  // TODO: read from app state
  advisorName = 'Advisor Name';
}
