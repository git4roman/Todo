import { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "./reducer.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.js";
import {
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  SUCCESS_VALUES,
  CLEAR_ALERT,
  GET_TODOS_SUCCESS,
  EDIT_TODO_BEGIN,
  EDIT_FETCH,
  EDIT_FETCH_SUCCESS,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO,
} from "./actions.js";
import { useAlertContext } from "./alertContext.js";

const initialState = {
  title: "",
  description: "",
  priorityOptions: ["low", "medium", "high"],
  priority: "low",
  isCompleted: false,
  completeOptions: [true, false],
  alertType: "",
  alertText: "",
  isLoading: false,
  showAlert: false,
  todos: [],
  id: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { displayAlert, clearAlert } = useAlertContext();
  const navigate = useNavigate();

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const handleEdit = async (id) => {
    navigate("/edit");
    dispatch({ type: EDIT_TODO_BEGIN, payload: { id } });
    try {
      const response = await axios.get(`/api/v1/todo/${id}`);
      const data = response.data;
      dispatch({
        type: EDIT_FETCH,
        payload: {
          title: data.title,
          description: data.description,
          priority: data.priority,
        },
      });
      dispatch({ type: EDIT_FETCH_SUCCESS });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch todo for editing.");
    }
  };

  const updateTodo = async () => {
    const { id, title, description, priority } = state;
    dispatch({ type: CREATE_JOB_BEGIN }); // Set loading state
    try {
      const response = await axios.patch(`/api/v1/todo/${id}`, {
        title,
        description,
        priority,
      });
      dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
      toast.success("Successfully updated");
      setTimeout(() => {
        navigate("/todo");
      }, 2000);
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo.");
    } finally {
      dispatch({ type: CLEAR_VALUES }); // Clear input fields after update
    }
  };

  // const deleteTodo = async () => {
  //   const id = state.id;
  //   try {
  //     const reponse = await axios.delete();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/todo/${id}`);

      if (response.status === 200) {
        console.log(`Todo with id: ${id} deleted successfully.`);
        // Optionally, redirect or refresh the list of todos
        // e.g., refreshTodos();
      } else {
        console.log(
          `Failed to delete todo with id: ${id}. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        `Error deleting todo with id: ${id}.`,
        error.response ? error.response.data : error.message
      );
    } finally {
      toast.success("Successfully Deleted");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/v1/auth/register");
      if (response.status === 201) {
        console.log("User created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const clearAlert = () => {
  //   setTimeout(() => {
  //     dispatch({ type: CLEAR_ALERT });
  //   }, 2000);
  // };

  const getAllTodo = async () => {
    try {
      const response = await axios.get("/api/v1/todo");
      dispatch({
        type: GET_TODOS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch todos.");
    }
  };

  useEffect(() => {
    getAllTodo(); // Fetch todos on component mount
  }, []);

  const createTodo = async () => {
    dispatch({ type: "CREATE_JOB_BEGIN" });

    try {
      const { title, description, priority } = state;
      const response = await axios.post("/api/v1/todo", {
        title,
        description,
        priority,
      });
      // toast.success("Successfully created a todo");
      displayAlert("success", "Successfully created a Todo");
      setTimeout(() => {
        clearAlert();
      }, 1500);
      // dispatch({
      //   type: "SHOW_ALERT",
      //   payload: {
      //     alertType: "success",
      //     alertText: "Successfully created a Todo",
      //   },
      // });
      dispatch({ type: "CLEAR_VALUES" });
    } catch (error) {
      toast.error(error);
      console.log("There is a problem", error);
    }
  };
  const AlertClear = () => {
    dispatch({ type: "CLEAR_ALERT" });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleChange,
        handleEdit,
        handleDelete,
        createTodo,
        getAllTodo,
        updateTodo,
        handleRegister,
        AlertClear,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
