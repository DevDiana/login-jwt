import { Routes } from '@angular/router';
import { authGuard } from './services/guard/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
];
