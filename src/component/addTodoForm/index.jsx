import React from "react";
import useTodoStore from "../../Store/todoStore";
import { useState } from "react";
import { form } from "framer-motion/client";

const AddTodoFrom = () => {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Bhai, pehle kuch likh toh lo! 😅");
      return;
    }

    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between p-2">
      <input
        type="text"
        value={text}
        className="flex-1 p-2 border rounded mr-6"
        onChange={(e) => setText(e.target.value)}
        placeholder="Add New Todo"
      />
      <button
        type="submit"
        className="transition duration-200 ease-in-out transform hover:bg-blue-500 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodoFrom;
