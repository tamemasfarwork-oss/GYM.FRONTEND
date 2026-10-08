// players.routes.ts
import { Routes } from '@angular/router';

export const PLAYERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./players-list/players-list').then((m) => m.PlayersList),
  },
  {
    path: 'add',
    loadComponent: () => import('./add-player/add-player').then((m) => m.AddPlayer),
  },
  {
    path: 'update/:playerID',
    loadComponent: () => import('./update-player/update-player').then((m) => m.UpdatePlayer),
  },
  {
    path: 'Picker',
    loadComponent: () => import('./player-picker/player-picker').then((m) => m.PlayerPicker),
  },
];
