import { NgZone, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = inject(SupabaseService).isLoggedIn;
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return true;
  }
  inject(NgZone).run(() => {
    inject(Router).navigate(['/auth']);
  });
  return false;
};
