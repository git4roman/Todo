import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* Space between title and buttons */
  padding: 0.5rem; /* Padding around the item for better spacing */
  border: 1px solid #ddd; /* Optional: border for visual separation */
  border-radius: 4px; /* Optional: rounded corners */

  p {
    flex-grow: 1; /* Allows the title to take remaining space */
    margin: 0; /* Reset margin for consistent spacing */
  }

  button {
    padding: 0.5rem 1rem; /* Consistent padding for buttons */
    border: none; /* Remove default border */
    border-radius: 4px; /* Rounded corners for buttons */
    cursor: pointer; /* Pointer cursor on hover */
    background-color: #007bff; /* Primary button color */
    color: white; /* Text color */
    transition: background-color 0.3s; /* Smooth transition on hover */

    &:hover {
      background-color: #0056b3; /* Darker shade on hover */
    }

    &:active {
      background-color: #004085; /* Even darker shade when pressed */
    }
  }
`;

const TodoItem = ({ todo, handleEdit, handleDelete }) => {
  return (
    <Wrapper className="todo-item">
      <p>{todo.title}</p>
      <button onClick={() => handleEdit(todo._id)}>Edit</button>
      <button onClick={() => handleDelete(todo._id)}>Delete</button>
    </Wrapper>
  );
};

export default TodoItem;
