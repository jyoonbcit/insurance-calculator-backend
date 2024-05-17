import { NgZone, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = () => {
  if (inject(SupabaseService).isLoggedIn) {
    return true;
  }
  inject(NgZone).run(() => {
    inject(Router).navigate(['/auth']);
  });
  return false;
};
