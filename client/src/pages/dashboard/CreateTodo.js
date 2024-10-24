import FormRowSelect from "../../components/FormRowSelect";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/appContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "../../components/Alert.js";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.section`
  /* border: 1px solid red; */
  padding: 20px;
  h1 {
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
  }
  button {
    margin: 11px;
    padding: 0.25rem 0.55rem;
    background-color: #627ffc;
    border-radius: 4px;
    border: 2px solid transparent;
    &:hover {
      background-color: #859bff;
    }
  }

  input {
    height: 25px;
  }
`;
const CreateTodo = () => {
  const {
    title,
    description,
    isCompleted,
    priority,
    completeOptions,
    priorityOptions,
    handleChange,
    createTodo,
    isLoading,
    showAlert,
    getAllTodo,
    todos,
  } = useAppContext();

  const handleTodoInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    createTodo();
  };
  return (
    <Wrapper>
      <ToastContainer position="top-center" autoClose="1500" />
      <h1>TODOS</h1>
      <form action="">
        <FormRow
          name={"title"}
          value={title}
          handlechange={handleTodoInput}
          labelText={"Title"}
        />
        <FormRow
          name={"description"}
          value={description}
          handlechange={handleTodoInput}
          labelText={"Description"}
        />

        <label htmlFor="priority">Priorty</label>
        <select name="priority" value={priority} onChange={handleTodoInput}>
          {priorityOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Adding" : "Add"}
        </button>
      </form>
    </Wrapper>
  );
};
export default CreateTodo;
