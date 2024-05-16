import { NgIf } from '@angular/common';
import { Component, Inject, NgZone, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { AppbarComponent } from 'app/core/components/appbar/appbar.component';
import { SupabaseService } from 'app/core/services/supabase.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [NgIf, AppbarComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  userData = signal({});
  pageName: string;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialog: TuiDialogService,
    private readonly supabase: SupabaseService,
    private readonly router: Router,
    private readonly zone: NgZone
  ) {
    this.pageName = this.getPageName();
    this.supabase.currentUser.subscribe(user => {
      console.log(user);
      this.userData.set(user?.user_metadata?.['email']);
      console.log(this.userData());
    });
  }

  toTitleCase(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  getPageName(): string {
    const pageName = this.toTitleCase(this.router.url.substring(1));

    return pageName ? pageName : 'Home';
  }

  signOut() {
    this.supabase.signOut();
    this.zone.run(() => {
      this.router.navigate(['/auth']);
    });
  }

  open(message: string) {
    this.dialog.open(message).subscribe();
  }
}
