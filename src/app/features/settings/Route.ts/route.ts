import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '', // /subscription-types
    loadComponent: () =>
      import('../subscription-types/subscription-types/subscription-types').then(
        (m) => m.SubscriptionTypes,
      ),
  },
  {
    path: 'add', // /subscription-types/add
    loadComponent: () => import('../addTypesofsub/add-types/add-types').then((m) => m.AddTypes),
  },
];
