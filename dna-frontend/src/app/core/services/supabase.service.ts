import { Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { ENVIRONMENT } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase!: SupabaseClient;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private zone: NgZone
  ) {
    this.supabase = createClient(
      ENVIRONMENT.supabase.url,
      ENVIRONMENT.supabase.key
    );

    this.supabase.auth.onAuthStateChange((_, session) => {
      this.user.next(session?.user ?? null);
      if (session?.user) {
        this.zone.run(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

  get currentUser() {
    return this.user.asObservable();
  }
}
