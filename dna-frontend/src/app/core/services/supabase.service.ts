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
      sessionStorage.setItem('session', JSON.stringify(session?.user.id));

      if (session?.user && this.router.url === '/auth') {
        this.zone.run(() => {
          this.router.navigate(['/landing']);
        });
      }
    });
  }

  get isLoggedIn() {
    return (
      sessionStorage.getItem('session') !== 'undefined' &&
      sessionStorage.getItem('session') !== undefined &&
      sessionStorage.getItem('session') !== null
    );
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
    return await this.supabase
      .from('client_profiles')
      .update({ client: client })
      .eq('id', client_id)
      .select();
  }

  async signUp(email: string, password: string) {
    this.clearSession();
    return await this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    this.clearSession();
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    this.clearSession();
    await this.supabase.auth.signOut();
  }

  private clearSession() {
    sessionStorage.removeItem('session');
  }
}
