import { Component, NgZone, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { LandingCardComponent } from 'app/core/components/landing-card/landing-card.component';
import { SupabaseService } from 'app/core/services/supabase.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LandingCardComponent, TuiButtonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  userData = signal({});

  // TODO: read from app state
  advisorName = 'Advisor Name';

  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router,
    private readonly zone: NgZone
  ) {}

  signOut() {
    this.supabase.signOut();
    this.zone.run(() => {
      this.router.navigate(['/auth']);
    });
  }
}
