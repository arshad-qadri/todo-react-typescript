import React, { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      todo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
      isDone: false,
    },
    {
      id: 2,
      todo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
      isDone: true,
    },
  ]);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <InputForm todos={todos} setTodos={setTodos} btn="Add" />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
