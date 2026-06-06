import { Injectable } from '@angular/core';

import type { CreateTodoRequest, Todo, UpdateTodoRequest } from '../models/todo.model';

const TODO_API_URL = 'http://localhost:3000/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  async getTodos(ownerId?: string): Promise<Todo[]> {
    const query = ownerId ? `?ownerId=${encodeURIComponent(ownerId)}` : '';
    const todos = await this.request<Todo[]>(query);

    return [...todos].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  }

  async createTodo(title: string, ownerId: string): Promise<Todo> {
    return this.request<Todo>('', {
      method: 'POST',
      body: JSON.stringify({
        ownerId,
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      } satisfies CreateTodoRequest),
    });
  }

  async updateTodo(todoId: string, updates: UpdateTodoRequest): Promise<Todo> {
    return this.request<Todo>(`/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTodo(todoId: string): Promise<void> {
    await this.request<void>(`/${todoId}`, {
      method: 'DELETE',
    });
  }

  async deleteTodos(todoIds: readonly string[]): Promise<void> {
    await Promise.all(todoIds.map((todoId) => this.deleteTodo(todoId)));
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(`${TODO_API_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Todo API request failed: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }
}
