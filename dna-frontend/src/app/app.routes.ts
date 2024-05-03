import { Routes } from '@angular/router';
import { AuthComponent } from 'app/core/components/auth/auth.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';

export const routes: Routes = [
  { path: '', component: CalculatorComponent, title: 'DNA | Home' },
  { path: 'auth', component: AuthComponent, title: 'DNA | Login' },
];
