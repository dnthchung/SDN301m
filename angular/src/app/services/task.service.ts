import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

import { API_ENDPOINTS, RXJS_TIMING } from '../commons/constants';
import { APP_MESSAGES } from '../commons/messages';
import { CreateTaskRequest, Task, TaskFilterStatus, TaskFilters, TaskStatus } from '../shared/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);
  private readonly filterState = new BehaviorSubject<TaskFilters>({ keyword: '', status: TaskFilterStatus.All });
  private readonly loadingState = new BehaviorSubject<boolean>(false);
  private readonly errorState = new BehaviorSubject<string | null>(null);
  private readonly mutationTrigger = new Subject<string>();

  readonly filters$ = this.filterState.asObservable();
  readonly loading$ = this.loadingState.asObservable();
  readonly error$ = this.errorState.asObservable();
  readonly mutations$ = this.mutationTrigger.asObservable();

  readonly tasks$ = combineLatest([
    this.refreshTrigger,
    this.filters$.pipe(
      debounceTime(RXJS_TIMING.searchDebounceMs),
      distinctUntilChanged((previous, current) => JSON.stringify(previous) === JSON.stringify(current)),
    ),
  ]).pipe(
    tap(() => {
      this.loadingState.next(true);
      this.errorState.next(null);
    }),
    switchMap(([, filters]) =>
      this.http.get<Task[]>(API_ENDPOINTS.tasks, { params: this.buildParams(filters) }).pipe(
        map((tasks) => this.applyClientFilters(tasks, filters)),
        catchError(() => {
          this.errorState.next(APP_MESSAGES.tasks.loadFailed);
          return of([]);
        }),
        finalize(() => this.loadingState.next(false)),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  updateFilters(filters: Partial<TaskFilters>): void {
    this.filterState.next({ ...this.filterState.value, ...filters });
  }

  createTask(task: CreateTaskRequest) {
    return this.http.post<Task>(API_ENDPOINTS.tasks, task).pipe(
      tap(() => {
        this.mutationTrigger.next(APP_MESSAGES.tasks.createSuccess);
        this.refreshTrigger.next();
      }),
    );
  }

  deleteTask(taskId: string) {
    return this.http.delete<void>(`${API_ENDPOINTS.tasks}/${taskId}`).pipe(
      tap(() => {
        this.mutationTrigger.next(APP_MESSAGES.tasks.deleteSuccess);
        this.refreshTrigger.next();
      }),
    );
  }

  updateStatus(task: Task, status: TaskStatus) {
    return this.http.patch<Task>(`${API_ENDPOINTS.tasks}/${task.id}`, { status }).pipe(
      tap(() => {
        this.mutationTrigger.next(`Moved "${task.title}"`);
        this.refreshTrigger.next();
      }),
    );
  }

  private buildParams(filters: TaskFilters): HttpParams {
    let params = new HttpParams();

    if (filters.keyword.trim()) {
      params = params.set('q', filters.keyword.trim());
    }

    if (filters.status !== TaskFilterStatus.All) {
      params = params.set('status', filters.status);
    }

    return params;
  }

  private applyClientFilters(tasks: Task[], filters: TaskFilters): Task[] {
    const keyword = filters.keyword.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesStatus = filters.status === TaskFilterStatus.All || task.status === filters.status;
      const matchesKeyword =
        !keyword ||
        task.title.toLowerCase().includes(keyword) ||
        task.description.toLowerCase().includes(keyword) ||
        task.assignee.toLowerCase().includes(keyword);

      return matchesStatus && matchesKeyword;
    });
  }
}
