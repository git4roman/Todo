import { Routes, Route, Outlet } from "react-router-dom";
import { Home, Todo } from "./pages";
import EditTodo from "./pages/dashboard/EditTodo.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          {/* Nested routes */}
          <Route index element={<Home />} />
          <Route path="todo" element={<Todo />} />
          <Route path="edit" element={<EditTodo />} />
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="*" element={<div>Errror</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
