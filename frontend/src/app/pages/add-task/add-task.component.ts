import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  submitting = false;
  errorMessage = '';

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const title = this.form.get('title')?.value?.trim();
    if (!title) {
      this.errorMessage = 'Title is required.';
      this.submitting = false;
      return;
    }

    this.taskService.addTask(title).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/tasks'], { queryParams: { created: 1 } });
      },
      error: () => {
        this.errorMessage = 'Unable to add task. Please try again.';
        this.submitting = false;
      }
    });
  }
}
