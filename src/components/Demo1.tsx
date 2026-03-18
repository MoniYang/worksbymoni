
import { useState } from "react";
import { cn } from "../lib/utils"
const ToDoListItem = ({text, onClick, toggleOnClick,  className }: {text: string, onClick: () => void, toggleOnClick : () => void, className : string }) => {
    return (
        <li className="flex flex-1 pb-3 items-center">
            <button className={cn("flex-1",className)} onClick={toggleOnClick}>{text}</button>
            <button onClick={onClick} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
          </li>
    )
}
export default function ToDoList() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<{id : number, text : string, completed : boolean}[]>([]);
  const addTodo = () => {
    setTodos([...todos, {id : todos.length + 1, text : text, completed : false}]);
    setText("");
  }

   const toggleTodo = (id : number) => {
    console.log("toggle");
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };


   const deleteTodo = (id : number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

   return (
    <div className="flex flex-col  p-20">
      <h1 className="text-2xl font-bold">Todo List</h1>

      
      <div className="flex gap-2 mt-10">
      <input value={text} onChange={(e) => setText(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2" type="text" />
      <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
      </div>

      <ul className="mt-10 flex flex-1 flex-col gap-2  divide-y divide-gray-300">
       {todos.map((todo) => (
         <ToDoListItem className={cn("", todo.completed && "line-through")} key={todo.id} text={todo.text}  toggleOnClick={() => toggleTodo(todo.id)} onClick={() => deleteTodo(todo.id)}/>
       ))}
      </ul>
    </div>
  );
}

