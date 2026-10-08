import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard'; // 1) استيراد جديد

export const routes: Routes = [
  {
    // 2) مسار الدخول (جديد)
    path: 'login',
    loadComponent: () => import('./features/login/login/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivate: [authGuard], // 3) يحمي كل ما بداخله
    loadComponent: () => import('./core/layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashbored', // الصفحة الافتراضية صارت الداشبورد
        pathMatch: 'full',
      },
      {
        path: 'players',
        loadChildren: () =>
          import('./features/Players/players.routes').then((m) => m.PLAYERS_ROUTES),
      },
      {
        path: 'subscriptions',
        loadChildren: () =>
          import('./features/Subscription/routes/sub.routes').then((m) => m.Sub_ROUTES),
      },
      {
        path: 'trainers',
        loadChildren: () =>
          import('./features/Triner/triner/routes/trien.routes').then((m) => m.trien_ROUTES),
      },
      {
        path: 'dashbored',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'subscription-types',
        loadChildren: () =>
          import('./features/settings/Route.ts/route').then((m) => m.SETTINGS_ROUTES),
      },
      {
        path: 'addbranch',
        loadComponent: () =>
          import('./features/branch/add-branch/add-branch').then((m) => m.AddBranch),
      },
    ],
  },

  { path: '**', redirectTo: '' }, // أي رابط غريب يرجع للبداية
];
