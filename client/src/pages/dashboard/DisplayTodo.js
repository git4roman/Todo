import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0;
  width: clamp(400px, 500px, 700px);
  border: 2px solid red;
  padding: 1rem;
  position: relative;

  tr {
    position: relative;
    &:hover {
      background-color: #fffff5;

      .description {
        display: block;
      }
    }
  }

  button {
    background-color: #627ffc;
    border-radius: 4px;
    border: 2px solid transparent;
    &:hover {
      background-color: #859bff;
    }
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%;
    border: 2px solid red;
    border-radius: 4px;
  }
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin: 20px 0;

  th,
  td {
    border: 2px solid red;
    padding: 10px;
  }

  button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const DescriptionTooltip = styled.div`
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  white-space: nowrap;
  top: -30px;
  left: 0;
  z-index: 1;
`;

const DisplayTodo = () => {
  const { todos, getAllTodo, handleEdit, handleDelete } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedTodos, setSortedTodos] = useState([]);

  useEffect(() => {
    getAllTodo();
  }, [todos]);

  useEffect(() => {
    if (todos) {
      // Filter based on the search term
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort by priority (assuming higher priority is represented by a smaller number)
      const sorted = filteredTodos.sort((a, b) => a.priority - b.priority);

      setSortedTodos(sorted);
    }
  }, [todos, searchTerm]);

  const renderTodos = () => {
    if (!sortedTodos || sortedTodos.length === 0) {
      return <p>No todos available.</p>;
    }

    return sortedTodos
      .slice()
      .reverse() // Optional: reverse to show the latest todos first
      .map((todo) => (
        <tr key={todo._id}>
          <td>{todo.title}</td>
          <td>
            <button onClick={() => handleEdit(todo._id)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </td>
          {todo.description && (
            <DescriptionTooltip className="description">
              {todo.description}
            </DescriptionTooltip>
          )}
        </tr>
      ));
  };

  return (
    <Wrapper>
      <h1>Display Todos</h1>

      {/* Search Input */}
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
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTodos()}</tbody>
      </TableWrapper>
    </Wrapper>
  );
};

export default DisplayTodo;
