import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthSession } from '@supabase/supabase-js';
import { TuiDialogService } from '@taiga-ui/core';
import { Profile } from 'app/core/models/profile.model';
import { SupabaseService } from 'app/core/services/supabase.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [NgIf],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent implements OnInit {
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly supabase: SupabaseService
  ) {}
  loading = false;
  profile!: Profile;
  session: AuthSession | null = null;

  async ngOnInit(): Promise<void> {
    this.session = this.supabase.session;
    await this.getProfile();
  }

  async getProfile() {
    try {
      this.loading = true;
      const { user } = this.session || {};
      const {
        data: profile,
        error,
        status,
      } = await this.supabase.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        this.open(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    await this.supabase.signOut();
  }

  open(message: string) {
    this.dialogs.open(message).subscribe();
  }
}
