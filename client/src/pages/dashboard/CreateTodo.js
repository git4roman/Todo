import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/appContext.js";
// import { ToastContainer, toast } from "react-toastify";
import Toast from "../../components/Toast.js";
// import "react-toastify/dist/ReactToastify.css";
// import Alert from "../../components/Alert.js";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;

  h1 {
    text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.15);
    margin-bottom: 16px;
    color: #333;
    font-size: 1.8rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    margin-bottom: 12px;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: #627ffc;
    box-shadow: 0 0 4px rgba(98, 127, 252, 0.3);
  }

  label {
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  button {
    margin-top: 12px;
    padding: 0.5rem 0.75rem;
    background-color: #627ffc;
    color: #fff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #5064e2;
    }

    &:disabled {
      background-color: #a0b0ff;
      cursor: not-allowed;
    }
  }
`;

const CreateTodo = () => {
  const {
    title,
    description,
    priority,
    handleChange,
    createTodo,
    isLoading,
    priorityOptions,
  } = useAppContext();

  const handleTodoInput = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!title || !description || !priority) {
    //   toast.error("Please fill in all fields!");
    //   return;
    // }

    createTodo();
  };

  return (
    <Wrapper>
      <Toast position="top-center" autoClose={1500} />
      <h1>Create a Todo</h1>
      <form onSubmit={handleSubmit}>
        <FormRow
          name="title"
          value={title}
          handleChange={handleTodoInput}
          labelText="Title"
        />
        <FormRow
          name="description"
          value={description}
          handleChange={handleTodoInput}
          labelText="Description"
        />

        <label htmlFor="priority">Priority</label>
        <select
          name="priority"
          value={priority} // Use state.priority for binding
          onChange={handleTodoInput}
        >
          {priorityOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </Wrapper>
  );
};

export default CreateTodo;
