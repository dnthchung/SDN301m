export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// ĐỂ SAVE IN-MEMORY DATABASE
export const todosDatabase: Todo[] = [];
