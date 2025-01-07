import { Routes } from '@angular/router';
import { PollListComponent } from './features/poll-list/poll-list.component';
import { CreatePollComponent } from './features/create-poll/create-poll.component';

export const routes: Routes = [
  {
    path: '',
    component: PollListComponent,
  },
  {
    path: 'create',
    component: CreatePollComponent,
  },
  {
    path: 'polls/:id',
    loadComponent: () =>
      import('./features/poll-details/poll-details.component').then(
        (m) => m.PollDetailsComponent
      ),
  },
];
