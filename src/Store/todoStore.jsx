import { create } from "zustand";

// Local storage se todos load karna
const getTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const useTodoStore = create((set) => ({
  todos: getTodosFromLocalStorage(),

  addTodo: (text) =>
    set((state) => {
      const newTodos = [
        ...state.todos,
        { text, completed: false, id: Date.now() },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos)); // Save to localStorage
      return { todos: newTodos };
    }),

  removeTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((t) => t.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos)); // Save updated list
      return { todos: newTodos };
    }),

  toggle: (id) =>
    set((state) => {
      const newTodos = state.todos.map(
        (t) => (t.id === id ? { ...t, completed: !t.completed } : t) // "completed" update
      );
      localStorage.setItem("todos", JSON.stringify(newTodos)); // Save updated list
      return { todos: newTodos };
    }),
}));

export default useTodoStore;
