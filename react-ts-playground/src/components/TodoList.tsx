import { TodoType } from "../App";
import Todo from "./Todo";
import { List } from "@mui/material";

export const TodoList = ({ todoList, markTodoAsCompleted }: { todoList: TodoType[]; markTodoAsCompleted: (todoId: string) => void }) => {
  return (
    <List>
      {todoList.map((todo) => (
        <Todo key={todo.id} id={todo.id} name={todo.name} isCompleted={todo.isCompleted} markTodoAsCompleted={markTodoAsCompleted} />
      ))}
    </List>
  );
};
