import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { HealthComponent } from './pages/health/health.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add', component: AddTaskComponent },
  { path: 'health', component: HealthComponent },
  { path: '**', redirectTo: 'tasks' }
];
