import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import type { Todo, TodoFilter } from '../models/todo.model';

@Component({
  selector: 'app-todo-page',
  imports: [],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPage {
  protected readonly filterOptions: ReadonlyArray<{
    value: TodoFilter;
    label: string;
  }> = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Open' },
    { value: 'completed', label: 'Done' },
  ];

  protected readonly newTitle = signal('');
  protected readonly activeFilter = signal<TodoFilter>('all');
  protected readonly editingTodoId = signal<number | null>(null);
  protected readonly editingTitle = signal('');

  protected readonly todos = signal<Todo[]>([
    { id: 1, title: 'Doc Angular signals và computed state', completed: false },
    { id: 2, title: 'Tách UI thành feature standalone component', completed: true },
    { id: 3, title: 'Luyện template control flow @if và @for', completed: false },
  ]);

  protected readonly totalCount = computed(() => this.todos().length);
  protected readonly completedCount = computed(
    () => this.todos().filter((todo) => todo.completed).length,
  );
  protected readonly activeCount = computed(() => this.totalCount() - this.completedCount());
  protected readonly filteredTodos = computed(() => {
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

  private nextTodoId = 4;

  protected updateDraft(value: string): void {
    this.newTitle.set(value);
  }

  protected addTodo(): void {
    const title = this.newTitle().trim();

    if (!title) {
      return;
    }

    this.todos.update((todos) => [
      {
        id: this.nextTodoId,
        title,
        completed: false,
      },
      ...todos,
    ]);
    this.nextTodoId += 1;
    this.newTitle.set('');
    this.activeFilter.set('all');
  }

  protected setFilter(filter: TodoFilter): void {
    this.activeFilter.set(filter);
  }

  protected toggleTodo(todoId: number, completed: boolean): void {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === todoId ? { ...todo, completed } : todo)),
    );
  }

  protected removeTodo(todoId: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== todoId));

    if (this.editingTodoId() === todoId) {
      this.cancelEdit();
    }
  }

  protected clearCompleted(): void {
    this.todos.update((todos) => todos.filter((todo) => !todo.completed));
  }

  protected startEdit(todo: Todo): void {
    this.editingTodoId.set(todo.id);
    this.editingTitle.set(todo.title);
  }

  protected updateEditingTitle(value: string): void {
    this.editingTitle.set(value);
  }

  protected saveEdit(todoId: number): void {
    const title = this.editingTitle().trim();

    if (!title) {
      this.removeTodo(todoId);
      return;
    }

    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === todoId ? { ...todo, title } : todo)),
    );
    this.cancelEdit();
  }

  protected cancelEdit(): void {
    this.editingTodoId.set(null);
    this.editingTitle.set('');
  }

  protected countForFilter(filter: TodoFilter): number {
    if (filter === 'active') {
      return this.activeCount();
    }

    if (filter === 'completed') {
      return this.completedCount();
    }

    return this.totalCount();
  }
}
