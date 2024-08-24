'use client';
import { todoState } from "@/state/atoms/todoState";
import { useSetRecoilState } from "recoil";
import { TrashIcon } from '@heroicons/react/24/outline'; // Import the TrashIcon

interface TodoProps {
  text: string;
  id: number;
}

export function Todo({ text, id }: TodoProps) {
  const setTodos = useSetRecoilState(todoState);

  function deleteTodo() {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md mb-2">
      <p className="text-indigo-700 flex-1">{text}</p>
      <button
        onClick={deleteTodo}
        className="flex items-center justify-center p-2 ml-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
      >
        <TrashIcon className="h-5 w-5" /> 
      </button>
    </div>
  );
}
