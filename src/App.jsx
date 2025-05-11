import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./component/Pages/HomePage";
import Register from "./component/Pages/Register";
import Login from "./component/Pages/Login";
import Profile from "./component/Pages/Profile";
import TodoList from "./component/todoList/index";

function App() {
  return (
    <div className="App">
      <div className="max-w-[90%] md:max-w-[50%] mx-auto">
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />

          {/* HomePage ko default route ke liye set kiya */}
          <Route element={<HomePage />} path="/" />

          {/* Profile and TodoList ko login ke baad accessible banayenge */}
          <Route element={<Profile />} path="/profile" />
          <Route element={<TodoList />} path="/todo-list" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
