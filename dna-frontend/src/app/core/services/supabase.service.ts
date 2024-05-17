import { Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENVIRONMENT } from 'environments/environment';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase!: SupabaseClient;

  constructor(
    private router: Router,
    private zone: NgZone
  ) {
    this.supabase = createClient(
      ENVIRONMENT.supabase.url,
      ENVIRONMENT.supabase.key
    );

    this.supabase.auth.onAuthStateChange((_, session) => {
      sessionStorage.setItem('user', JSON.stringify(session?.user));

      if (session?.user && this.router.url === '/auth') {
        this.zone.run(() => {
          this.router.navigate(['/landing']);
        });
      }
    });
  }

  get isLoggedIn() {
    return !!sessionStorage.getItem('user');
  }

  async createClient() {
    return await this.supabase
      .from('client_profiles')
      .insert([{ client: '{}' }])
      .select();
  }

  async getClient(client_id: number) {
    return await this.supabase
      .from('client_profiles')
      .select('*')
      .eq('id', client_id)
      .single();
  }

  async updateClient(client_id: number, client: Client) {
    const clientJson = JSON.stringify(client);
    return await this.supabase
      .from('client_profiles')
      .update({ client: clientJson })
      .eq('id', client_id)
      .select();
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
}
