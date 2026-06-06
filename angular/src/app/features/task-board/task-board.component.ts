import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { distinctUntilChanged } from 'rxjs';

import { RXJS_TIMING } from '../../commons/constants';
import { APP_MESSAGES } from '../../commons/messages';
import { TaskService } from '../../services/task.service';
import { TASK_STATUSES, Task, TaskFilterStatus, TaskStatus } from '../../shared/models/task.model';

@Component({
  selector: 'app-task-board',
  imports: [
    AsyncPipe,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly taskService = inject(TaskService);

  protected readonly statuses = TASK_STATUSES;
  protected readonly tasks$ = this.taskService.tasks$;
  protected readonly loading$ = this.taskService.loading$;
  protected readonly error$ = this.taskService.error$;

  protected readonly searchControl = this.formBuilder.nonNullable.control('');
  protected readonly statusControl = this.formBuilder.nonNullable.control<TaskStatus | TaskFilterStatus.All>(
    TaskFilterStatus.All,
  );
  protected readonly taskForm = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    assignee: ['Chung', Validators.required],
    description: ['', Validators.required],
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((keyword) => this.taskService.updateFilters({ keyword }));

    this.statusControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => this.taskService.updateFilters({ status }));

    this.taskService.mutations$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((message) => {
      this.snackBar.open(message, 'Close', { duration: RXJS_TIMING.snackbarDurationMs });
    });
  }

  protected tasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
    return tasks.filter((task) => task.status === status);
  }

  protected createTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskService.createTask({ ...this.taskForm.getRawValue(), status: TaskStatus.Todo }).subscribe({
      next: () => this.taskForm.reset({ title: '', assignee: 'Chung', description: '' }),
      error: () =>
        this.snackBar.open(APP_MESSAGES.tasks.createFailed, 'Close', {
          duration: RXJS_TIMING.errorSnackbarDurationMs,
        }),
    });
  }

  protected deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe({
      error: () =>
        this.snackBar.open(APP_MESSAGES.tasks.deleteFailed, 'Close', {
          duration: RXJS_TIMING.errorSnackbarDurationMs,
        }),
    });
  }

  protected drop(event: CdkDragDrop<Task[]>, status: TaskStatus): void {
    const task = event.item.data as Task;
    if (!task || task.status === status) {
      return;
    }

    this.taskService.updateStatus(task, status).subscribe({
      error: () =>
        this.snackBar.open(APP_MESSAGES.tasks.moveFailed, 'Close', {
          duration: RXJS_TIMING.errorSnackbarDurationMs,
        }),
    });
  }
}
