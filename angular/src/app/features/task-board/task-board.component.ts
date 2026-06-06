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
  template: `
    <section class="board-shell">
      <header class="board-header">
        <div>
          <p class="eyebrow">RxJS learning project</p>
          <h1>Task board</h1>
        </div>

        @if (loading$ | async) {
          <mat-spinner diameter="28" aria-label="Loading tasks" />
        }
      </header>

      <section class="controls" aria-label="Task controls">
        <mat-form-field appearance="outline">
          <mat-label>Search tasks</mat-label>
          <mat-icon matPrefix>search</mat-icon>
          <input matInput [formControl]="searchControl" autocomplete="off" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select [formControl]="statusControl">
            <mat-option value="all">All statuses</mat-option>
            @for (status of statuses; track status.value) {
              <mat-option [value]="status.value">{{ status.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </section>

      <section class="create-task" aria-label="Create task">
        <form [formGroup]="taskForm" (ngSubmit)="createTask()">
          <mat-form-field appearance="outline">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Assignee</mat-label>
            <input matInput formControlName="assignee" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="description-field">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="1"></textarea>
          </mat-form-field>

          <button mat-flat-button type="submit" [disabled]="taskForm.invalid">
            <mat-icon>add</mat-icon>
            Add task
          </button>
        </form>
      </section>

      @if (error$ | async; as error) {
        <p class="error-state">{{ error }}</p>
      }

      @if (tasks$ | async; as tasks) {
        <section class="board" cdkDropListGroup aria-label="Task board columns">
          @for (status of statuses; track status.value) {
            <article
              class="column"
              cdkDropList
              [id]="status.value"
              [cdkDropListData]="tasksByStatus(tasks, status.value)"
              (cdkDropListDropped)="drop($event, status.value)"
            >
              <header class="column-header">
                <h2>{{ status.label }}</h2>
                <span>{{ tasksByStatus(tasks, status.value).length }}</span>
              </header>

              <div class="task-list">
                @for (task of tasksByStatus(tasks, status.value); track task.id) {
                  <mat-card class="task-card" cdkDrag [cdkDragData]="task">
                    <mat-card-header>
                      <mat-card-title>{{ task.title }}</mat-card-title>
                      <button
                        mat-icon-button
                        type="button"
                        matTooltip="Delete task"
                        [attr.aria-label]="'Delete ' + task.title"
                        (click)="deleteTask(task)"
                      >
                        <mat-icon>delete</mat-icon>
                      </button>
                    </mat-card-header>
                    <mat-card-content>
                      <p>{{ task.description }}</p>
                      <span class="assignee">{{ task.assignee }}</span>
                    </mat-card-content>
                  </mat-card>
                } @empty {
                  <p class="empty-state">No tasks</p>
                }
              </div>
            </article>
          }
        </section>
      }
    </section>
  `,
  styles: `
    .board-shell {
      display: grid;
      gap: 1rem;
      padding: 1.25rem;
    }

    .board-header,
    .controls,
    .create-task form,
    .column-header {
      align-items: center;
      display: flex;
      gap: 1rem;
    }

    .board-header {
      justify-content: space-between;
    }

    .eyebrow {
      color: #4c6f5d;
      font-size: 0.75rem;
      font-weight: 700;
      margin: 0 0 0.25rem;
      text-transform: uppercase;
    }

    h1,
    h2,
    p {
      margin: 0;
    }

    h1 {
      font-size: clamp(1.6rem, 3vw, 2.25rem);
    }

    .controls {
      flex-wrap: wrap;
    }

    .controls mat-form-field {
      flex: 1 1 240px;
    }

    .create-task form {
      align-items: start;
      flex-wrap: wrap;
    }

    .create-task mat-form-field {
      flex: 1 1 180px;
    }

    .create-task .description-field {
      flex-basis: 280px;
    }

    .create-task button {
      height: 56px;
    }

    .error-state {
      background: #fff0f0;
      border: 1px solid #d83b3b;
      border-radius: 8px;
      color: #8b1d1d;
      padding: 0.75rem 1rem;
    }

    .board {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .column {
      background: #f4f6f8;
      border: 1px solid #d8dee4;
      border-radius: 8px;
      display: grid;
      gap: 0.75rem;
      min-height: 360px;
      padding: 0.75rem;
    }

    .column-header {
      justify-content: space-between;
    }

    .column-header h2 {
      font-size: 1rem;
    }

    .column-header span {
      background: #dbe7ff;
      border-radius: 999px;
      min-width: 2rem;
      padding: 0.2rem 0.5rem;
      text-align: center;
    }

    .task-list {
      display: grid;
      gap: 0.75rem;
    }

    .task-card {
      border-radius: 8px;
      cursor: grab;
    }

    .task-card mat-card-header {
      align-items: start;
      justify-content: space-between;
    }

    .task-card mat-card-title {
      font-size: 1rem;
      line-height: 1.35;
    }

    .task-card p {
      color: #4f5b66;
      margin: 0.5rem 0 0.75rem;
    }

    .assignee {
      color: #275d49;
      font-size: 0.85rem;
      font-weight: 700;
    }

    .empty-state {
      border: 1px dashed #b8c2cc;
      border-radius: 8px;
      color: #66717d;
      padding: 1rem;
      text-align: center;
    }

    .cdk-drag-preview {
      box-shadow: 0 8px 24px rgb(0 0 0 / 18%);
    }

    .cdk-drag-placeholder {
      opacity: 0.35;
    }

    .cdk-drag-animating,
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 160ms ease;
    }

    @media (max-width: 900px) {
      .board {
        grid-template-columns: 1fr;
      }
    }
  `,
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
