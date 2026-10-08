import { Route, Routes } from '@angular/router';
export const trien_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../triner-list').then((m) => m.TrinerList),
  },
  {
    path: 'private_train',
    loadComponent: () =>
      import('../add-private-train/add-private-train').then((m) => m.AddPrivateTrain),
  },
];
