import { Routes, Route, Outlet } from "react-router-dom";
import { Home, Todo, Register, Landing, Login, ProtectedRoute } from "./pages";
import EditTodo from "./pages/dashboard/EditTodo.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          {/* Nested routes */}
          <Route index element={<Todo />} />
          <Route path="edit" element={<EditTodo />} />
          {/* <Route path="todo" element={<Todo />} /> */}
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="*" element={<div>Errror</div>} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
