import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        setTodos(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTodos();
  }, []);

  // Add new todo
  const addNew = async () => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: newTodo,
          completed: false,
        }
      );
      console.log(res.data);
      const newTo = [...todos, res.data];
      setTodos(newTo);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (id) => {
    // setTodos(todos.filter((todo) => todo.id !== id));
    try {
      const res = axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      //newTo là mảng mới sau khi xóa, lọc ra những phần tử có id khác với id của phần tử cần xóa
      const newTo = todos.filter((todo) => todo.id !== id);
      setTodos(newTo);
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={addNew}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search todos"
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="border p-4 rounded shadow-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{todo.title}</h3>
              <p
                className={`text-sm ${
                  todo.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {todo.completed ? "Completed" : "Not Completed"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="text-sm">Mark as done</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
