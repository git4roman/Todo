import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  width: clamp(600px, 90%, 1200px); /* Increased width for better display */
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  input {
    padding: 0.75rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
    transition: border-color 0.3s;
  }
  input:focus {
    outline: none;
    border-color: #627ffc;
    box-shadow: 0 0 4px rgba(98, 127, 252, 0.4);
  }
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%; /* Full width table */
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  th,
  td {
    padding: 20px; /* Increased padding for larger cells */
    border: 1px solid #ddd;
    text-align: center;
  }
  th {
    background-color: #627ffc;
    color: #fff;
  }
  tbody tr:hover {
    background-color: #f9f9f9;
  }
`;

const Button = styled.button`
  background-color: #4caf50; /* Green color for edit button */
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:nth-child(2) {
    background-color: #f44336; /* Red color for delete button */
  }
  &:nth-child(2):hover {
    background-color: #d32f2f;
  }
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  white-space: nowrap;
  top: -30px;
  z-index: 1;
  pointer-events: none;
  max-width: 200px;
  tr:hover & {
    display: block;
  }
`;

const DisplayTodo = () => {
  const { todos, getAllTodo, handleEdit, handleDelete } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getAllTodo();
  }, [todos]);

  useEffect(() => {
    if (todos) {
      const filtered = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const sorted = filtered.sort((a, b) => a.priority - b.priority);
      setFilteredTodos(sorted);
    }
  }, [searchTerm, todos]);

  const renderTodos = () => {
    if (!filteredTodos || filteredTodos.length === 0) {
      return (
        <tr>
          <td colSpan="2">No todos available.</td>
        </tr>
      );
    }

    return filteredTodos.map((todo) => (
      <tr key={todo._id}>
        <td>{todo.title}</td>
        <td>
          <Button onClick={() => handleEdit(todo._id)}>Edit</Button>
          <Button onClick={() => handleDelete(todo._id)}>Delete</Button>
          {todo.description && <Tooltip>{todo.description}</Tooltip>}
        </td>
      </tr>
    ));
  };

  return (
    <Wrapper>
      <h1>Display Todos</h1>
      <input
        type="text"
        placeholder="Search todos by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableWrapper>
        <thead>
          <tr>
            <th>Todo Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTodos()}</tbody>
      </TableWrapper>
    </Wrapper>
  );
};

export default DisplayTodo;
