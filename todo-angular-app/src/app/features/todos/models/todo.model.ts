export type TodoFilter = 'all' | 'active' | 'completed';

export interface Todo {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
}
