import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { getApiUrl, isMockMode } from '../config/runtime-config';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private mockTasks: Task[] = [
    {
      id: '1',
      title: 'Review CI pipeline logs',
      done: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Add alert for API latency',
      done: true,
      createdAt: new Date().toISOString()
    }
  ];

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    if (isMockMode()) {
      return of(this.mockTasks).pipe(delay(300));
    }

    return this.http.get<Task[]>(`${getApiUrl()}/tasks`);
  }

  addTask(title: string): Observable<Task> {
    if (isMockMode()) {
      const newTask: Task = {
        id: String(Date.now()),
        title,
        done: false,
        createdAt: new Date().toISOString()
      };
      this.mockTasks = [newTask, ...this.mockTasks];
      return of(newTask).pipe(delay(300));
    }

    return this.http.post<Task>(`${getApiUrl()}/tasks`, { title });
  }

  getHealth(): Observable<unknown> {
    if (isMockMode()) {
      return of({
        status: 'mock',
        service: 'frontend-only',
        time: new Date().toISOString()
      }).pipe(delay(200));
    }

    return this.http.get<unknown>(`${getApiUrl()}/health`);
  }
}
