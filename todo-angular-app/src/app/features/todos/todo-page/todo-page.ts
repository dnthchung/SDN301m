import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

import type { Todo, TodoFilter } from '../models/todo.model';
import { TodoApiService } from '../services/todo-api.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-todo-page',
  imports: [],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPage {
  private readonly todoApi = inject(TodoApiService);
  private readonly authService = inject(AuthService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly filterOptions: ReadonlyArray<{
    value: TodoFilter;
    label: string;
  }> = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Open' },
    { value: 'completed', label: 'Done' },
  ];

  readonly newTitle = signal('');
  readonly activeFilter = signal<TodoFilter>('all');
  readonly editingTodoId = signal<string | null>(null);
  readonly editingTitle = signal('');
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly todos = signal<Todo[]>([]);

  readonly totalCount = computed(() => this.todos().length);
  readonly completedCount = computed(() => this.todos().filter((todo) => todo.completed).length);
  readonly activeCount = computed(() => this.totalCount() - this.completedCount());
  readonly filteredTodos = computed(() => {
    const filter = this.activeFilter();

    return this.todos().filter((todo) => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return true;
    });
  });

  constructor() {
    if (this.isBrowser) {
      void this.loadTodos();
    }
  }

  async loadTodos(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const currentUser = this.authService.currentUser();

      if (!currentUser) {
        this.todos.set([]);
        this.errorMessage.set('Bạn cần đăng nhập bằng tài khoản user để xem todo.');
        return;
      }

      this.todos.set(await this.todoApi.getTodos(currentUser.id));
    } catch {
      this.errorMessage.set('Không thể tải danh sách todo. Hãy kiểm tra JSON Server.');
    } finally {
      this.isLoading.set(false);
    }
  }

  updateDraft(value: string): void {
    this.newTitle.set(value);
  }

  async addTodo(): Promise<void> {
    const title = this.newTitle().trim();

    if (!title) {
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);

    try {
      const currentUser = this.authService.currentUser();

      if (!currentUser) {
        this.errorMessage.set('Bạn cần đăng nhập bằng tài khoản user để thêm todo.');
        return;
      }

      const createdTodo = await this.todoApi.createTodo(title, currentUser.id);

      this.todos.update((todos) => [createdTodo, ...todos]);
      this.newTitle.set('');
      this.activeFilter.set('all');
    } catch {
      this.errorMessage.set('Không thể thêm todo mới. Hãy kiểm tra mock API.');
    } finally {
      this.isSaving.set(false);
    }
  }

  setFilter(filter: TodoFilter): void {
    this.activeFilter.set(filter);
  }

  async toggleTodo(todoId: string, completed: boolean): Promise<void> {
    this.isSaving.set(true);
    this.errorMessage.set(null);

    try {
      const updatedTodo = await this.todoApi.updateTodo(todoId, { completed });

      this.replaceTodo(updatedTodo);
    } catch {
      this.errorMessage.set('Không thể cập nhật trạng thái todo.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async removeTodo(todoId: string): Promise<void> {
    this.isSaving.set(true);
    this.errorMessage.set(null);

    try {
      await this.todoApi.deleteTodo(todoId);
      this.todos.update((todos) => todos.filter((todo) => todo.id !== todoId));

      if (this.editingTodoId() === todoId) {
        this.cancelEdit();
      }
    } catch {
      this.errorMessage.set('Không thể xoá todo.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async clearCompleted(): Promise<void> {
    const completedTodoIds = this.todos()
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);

    if (completedTodoIds.length === 0) {
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);

    try {
      await this.todoApi.deleteTodos(completedTodoIds);
      this.todos.update((todos) => todos.filter((todo) => !todo.completed));
    } catch {
      this.errorMessage.set('Không thể xoá các todo đã hoàn thành.');
    } finally {
      this.isSaving.set(false);
    }
  }

  startEdit(todo: Todo): void {
    this.editingTodoId.set(todo.id);
    this.editingTitle.set(todo.title);
  }

  updateEditingTitle(value: string): void {
    this.editingTitle.set(value);
  }

  async saveEdit(todoId: string): Promise<void> {
    const title = this.editingTitle().trim();

    if (!title) {
      await this.removeTodo(todoId);
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);

    try {
      const updatedTodo = await this.todoApi.updateTodo(todoId, { title });

      this.replaceTodo(updatedTodo);
      this.cancelEdit();
    } catch {
      this.errorMessage.set('Không thể lưu thay đổi todo.');
    } finally {
      this.isSaving.set(false);
    }
  }

  cancelEdit(): void {
    this.editingTodoId.set(null);
    this.editingTitle.set('');
  }

  countForFilter(filter: TodoFilter): number {
    if (filter === 'active') {
      return this.activeCount();
    }

    if (filter === 'completed') {
      return this.completedCount();
    }

    return this.totalCount();
  }

  private replaceTodo(updatedTodo: Todo): void {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  }
}
