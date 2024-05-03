import { Routes } from '@angular/router';
import { AuthComponent } from 'app/core/components/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Temporary redirect to auth
  { path: 'auth', component: AuthComponent, title: 'DNA | Login' },
];
