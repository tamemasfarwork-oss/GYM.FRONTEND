// sub.routes.ts
import { Routes } from '@angular/router';

export const Sub_ROUTES: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('../add-subscription/add-subscription').then((m) => m.AddSubscription),
  },
  {
    path: '',
    loadComponent: () => import('../sub-list/sub-list').then((m) => m.SubList),
  },
  {
    path: 'expired',
    loadComponent: () => import('../expired-subs/expired-subs').then((m) => m.ExpiredSubs),
  },
  {
    path: 'renew/:subId',
    loadComponent: () => import('../renew-sub/renew-sub').then((m) => m.RenewSub),
  },
];
