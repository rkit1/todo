import { Routes } from '@angular/router';





export const routes: Routes = [
  {
    path: 'tasks/create',
    loadComponent: () => import('./create/create').then(m => m.Create)
  },
  {
    path: 'tasks/:id',
    loadComponent: () => import('./detail/detail').then(m => m.Detail)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/tasks').then(m => m.Tasks),
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./error-404/error-404').then(m => m.Error404)
  }
];
