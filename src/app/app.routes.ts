import { Routes } from '@angular/router';
import { Tasks } from './tasks/tasks';
import { Detail } from './detail/detail';
import { Create } from './create/create';
import { Error404 } from './error-404/error-404';

export const routes: Routes = [
  {
    path: 'tasks/create',
    component: Create
  },
  {
    path: 'tasks/:id',
    component: Detail
  },
  {
    path: 'tasks',
    component: Tasks,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: Error404
  }
];
