"use client";
import { useState, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "@/state/atoms/todoState";
import { Todo } from "./todo";
import { useRecoilValue } from "recoil";
import { totalTodos } from "@/state/selectors/totalTodos";

interface Todo {
  id: number;
  text: string;
}

export function Todos() {
  const [todos, setTodos] = useRecoilState<Todo[]>(todoState);
  const [inputText, setInputText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const totalTodoState = useRecoilValue(totalTodos);

  function addTodo() {
    if (inputText.trim() === "") {
      setError("Please enter a todo.");
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random(), text: inputText },
    ]);
    setInputText("");
    setError(null);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function clearTodos() {
    setTodos([]);
    setError(null);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="p-6 border border-gray-300 rounded shadow bg-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">TODO</h1>
        <h3 className="text-lg mb-2 text-center">Total Todos: {totalTodoState}</h3>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <div className="mb-4 flex justify-center">
          <input
            value={inputText}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter your todo"
            className="p-2 border border-gray-300 rounded flex-1"
          />
          <button
            onClick={addTodo}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
          <button
            onClick={clearTodos}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear
          </button>
        </div>
        <div
          className="mt-4 space-y-2 overflow-y-auto"
          style={{ maxHeight: "400px" }} // Adjust height to show at least 6 todos
        >
          {todos.map((todo) => (
            <Todo key={todo.id} text={todo.text} id={todo.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
