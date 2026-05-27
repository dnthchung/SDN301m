import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import type { AuthUser } from '../../../core/auth/auth.model';
import { AuthService } from '../../../core/auth/auth.service';
import type { Todo } from '../models/todo.model';
import { TodoApiService } from '../services/todo-api.service';
import { TodoPage } from './todo-page';

describe('TodoPage', () => {
  let component: TodoPage;
  let fixture: ComponentFixture<TodoPage>;
  let currentUser: ReturnType<typeof signal<AuthUser | null>>;
  let todoApiMock: {
    getTodos: ReturnType<typeof vi.fn<(ownerId?: string) => Promise<Todo[]>>>;
    createTodo: ReturnType<typeof vi.fn<(title: string, ownerId: string) => Promise<Todo>>>;
    updateTodo: ReturnType<
      typeof vi.fn<
        (todoId: string, updates: Partial<Pick<Todo, 'title' | 'completed'>>) => Promise<Todo>
      >
    >;
    deleteTodo: ReturnType<typeof vi.fn<(todoId: string) => Promise<void>>>;
    deleteTodos: ReturnType<typeof vi.fn<(todoIds: readonly string[]) => Promise<void>>>;
  };

  beforeEach(async () => {
    currentUser = signal<AuthUser | null>({
      id: 'u-1',
      username: 'Learner',
      email: 'learner@example.com',
      role: 'user',
    });

    const todos: Todo[] = [
      {
        id: '3',
        ownerId: 'u-1',
        title: 'Luyện template control flow @if và @for',
        completed: false,
        createdAt: '2026-05-27T03:00:00.000Z',
      },
      {
        id: '2',
        ownerId: 'u-1',
        title: 'Tách UI thành feature standalone component',
        completed: true,
        createdAt: '2026-05-27T02:45:00.000Z',
      },
      {
        id: '1',
        ownerId: 'u-1',
        title: 'Doc Angular signals và computed state',
        completed: false,
        createdAt: '2026-05-27T02:30:00.000Z',
      },
    ];

    todoApiMock = {
      getTodos: vi.fn(async () => todos),
      createTodo: vi.fn(async (title: string, ownerId: string) => ({
        id: '4',
        ownerId,
        title,
        completed: false,
        createdAt: '2026-05-27T03:15:00.000Z',
      })),
      updateTodo: vi.fn(async (todoId, updates) => {
        const todo = todos.find((item) => item.id === todoId);

        if (!todo) {
          throw new Error('Todo not found');
        }

        return {
          ...todo,
          ...updates,
        };
      }),
      deleteTodo: vi.fn(async () => undefined),
      deleteTodos: vi.fn(async () => undefined),
    };

    await TestBed.configureTestingModule({
      imports: [TodoPage],
      providers: [
        { provide: AuthService, useValue: { currentUser } },
        { provide: TodoApiService, useValue: todoApiMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the page title and initial todos', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Todo Angular App');
    expect(compiled.querySelectorAll('.todo-item')).toHaveLength(3);
  });

  it('should add a todo from the composer form', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector<HTMLInputElement>('#todo-title');
    const form = compiled.querySelector<HTMLFormElement>('.composer__form');

    expect(input).toBeTruthy();
    expect(form).toBeTruthy();

    input!.value = 'Viết unit test cho todo page';
    input!.dispatchEvent(new Event('input'));
    form!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(todoApiMock.createTodo).toHaveBeenCalledWith('Viết unit test cho todo page', 'u-1');
    expect(compiled.querySelector('.todo-list')?.textContent).toContain(
      'Viết unit test cho todo page',
    );
    expect(compiled.querySelectorAll('.todo-item')).toHaveLength(4);
  });

  it('should filter active todos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const openFilter = Array.from(
      compiled.querySelectorAll<HTMLButtonElement>('.filters button'),
    ).find((button) => button.textContent?.includes('Open'));

    expect(openFilter).toBeTruthy();

    openFilter!.click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.todo-item')).toHaveLength(2);
    expect(compiled.querySelector('.todo-list')?.textContent).not.toContain(
      'Tách UI thành feature standalone component',
    );
  });
});
