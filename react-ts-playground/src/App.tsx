import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, useState, useEffect } from "react";
import { CreateNewTodo } from "./components/CreateNewTodo";
import { TodoList } from "./components/TodoList";
import { Container, Typography } from "@mui/material";

// Custom type
export type TodoType = {
  id: string;
  name: string;
  isCompleted: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [newTodoString, setNewTodoString] = useState<string>("");

  // Load todo list from localStorage on component mount
  useEffect(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      setTodoList(JSON.parse(savedTodoList));
    }
  }, []);

  // Save todo list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Event handler
  const onNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoString(e.target.value);
  };

  const onAddingBtnClick = () => {
    if (newTodoString.trim() === "") return;

    const newTodoItem: TodoType = {
      id: uuidv4(),
      name: newTodoString,
      isCompleted: false,
    };
    setTodoList([newTodoItem, ...todoList]);
    setNewTodoString(""); // Clear input field
  };

  const markTodoAsCompleted = (todoId: string) => {
    setTodoList((prevList) => prevList.map((todo) => (todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todo List
      </Typography>
      <CreateNewTodo newTodoString={newTodoString} onNewTodoChange={onNewTodoChange} onAddingBtnClick={onAddingBtnClick} />
      <TodoList todoList={todoList} markTodoAsCompleted={markTodoAsCompleted} />
    </Container>
  );
}

export default App;
