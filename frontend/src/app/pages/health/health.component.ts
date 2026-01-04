import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
  frontendVersion = 'unknown';
  healthResponse: unknown = null;
  loading = false;
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const meta = document.querySelector('meta[name="app-version"]');
    this.frontendVersion = meta?.getAttribute('content') || 'unknown';
    this.loadHealth();
  }

  loadHealth(): void {
    this.loading = true;
    this.errorMessage = '';

    this.taskService.getHealth().subscribe({
      next: (health) => {
        this.healthResponse = health;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to reach backend health endpoint.';
        this.loading = false;
      }
    });
  }
}
