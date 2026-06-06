export type TodoFilter = 'all' | 'active' | 'completed';

export interface Todo {
  readonly id: string;
  readonly ownerId: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: string;
}

export type CreateTodoRequest = Pick<Todo, 'ownerId' | 'title' | 'completed' | 'createdAt'>;

export type UpdateTodoRequest = Partial<Pick<Todo, 'title' | 'completed'>>;
