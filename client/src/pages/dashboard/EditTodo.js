import FormRowSelect from "../../components/FormRowSelect";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/appContext.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "../../components/Alert.js";

const EditTodo = () => {
  const {
    title,
    description,
    priority,
    priorityOptions,
    handleChange,
    updateTodo,
    isLoading,
    showAlert,
  } = useAppContext();

  const handleTodoInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await updateTodo(); // Make sure updateTodo returns a promise
  };

  return (
    <section>
      <ToastContainer position="top-center" autoClose="1500" />
      <h1>Edit Todo</h1>
      {showAlert && <Alert />} {/* Show alert if there's one */}
      <form onSubmit={handleSubmit}>
        <FormRow
          name={"title"}
          value={title}
          handlechange={handleTodoInput}
          labelText={"TITLE"}
        />
        <FormRow
          name={"description"}
          value={description}
          handlechange={handleTodoInput}
          labelText={"Description"}
        />
        <label htmlFor="priority">Priority</label>
        <select name="priority" value={priority} onChange={handleTodoInput}>
          {priorityOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </section>
  );
};

export default EditTodo;
