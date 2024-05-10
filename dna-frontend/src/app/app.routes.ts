import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/calculator/calculator.component').then(
        com => com.CalculatorComponent
      ),
    title: 'DNA | Home',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then(com => com.AuthComponent),
    title: 'DNA | Login',
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        com => com.LandingComponent
      ),
    title: 'DNA | Home',
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then(
        com => com.SignupComponent
      ),
    title: 'DNA | Signup',
  },
  {
    path: 'client-list',
    loadComponent: () =>
      import('./pages/client-list/client-list.component').then(
        com => com.ClientListComponent
      ),
    title: 'DNA | Clients',
  },
  {
    path: 'test',
    loadComponent: () =>
      import('./pages/test-page/test-page.component').then(
        com => com.TestPageComponent
      ),
    title: 'DNA | Test Page',
  },
];
