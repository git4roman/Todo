import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "../utils/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "./appContext";
import { useAlertContext } from "./alertContext";

const AuthContext = createContext();

const initialState = {
  user: null,
  name: "",
  email: "",
  password: "",
  showAlert: false,
  alertType: "",
  alertText: "",
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { displayAlert, clearAlert } = useAlertContext();

  // const {createAlert}=useAppContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Base URL:", axios.defaults.baseURL);
        const response = await axios.get("/api/v1/auth/login"); // Replace with your actual endpoint to fetch user data
        if (response.data) {
          dispatch({
            type: "SETUP_USER",
            payload: { user: response.data.user },
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error); // Handle error if needed
      }
    };

    fetchUser();
  }, []);
  const handleauthChange = ({ name, value }) => {
    // handle auth change here
    dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
  };

  const registerFunc = async (currentUser) => {
    try {
      // dispatch({ type: "SETUP_USER" });
      const { data } = await axios.post("/api/v1/auth/register", currentUser);

      // Dispatch the action to store user data
      dispatch({
        type: "SETUP_USER",
        payload: { user: data.user },
      });
      displayAlert("success", "Successfully Registered");
      setTimeout(() => {
        clearAlert();
      }, 1500);

      navigate("/login");

      // Optionally, clear alert after navigating
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "An error occurred during registration";
      dispatch({ type: "SETUP_USER_FAILURE" });
      toast.error(errorMessage);
    }
  };

  const loginFunc = async (currentUser) => {
    try {
      console.log("Attempting login with", currentUser); // Debugging log
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      if (data) {
        const { user } = data;
        console.log(user, "thiosskdjfksdhf");

        dispatch({ type: "SETUP", payload: { user } });
        displayAlert("success", "Successfully logged in");
        setTimeout(() => {
          clearAlert();
        }, 1500);
        navigate("/");
      } else {
        console.error("Login failed: No data received.");
      }
    } catch (error) {
      console.error("Login error:", error); // Debugging log
      toast.error(error.response?.data?.msg || "Login failed");
    }
  };

  const logOut = async () => {
    try {
      const reponse = await axios.get("/api/v1/auth/logout");
      // dispatch({
      //   type: "SHOW_ALERT",
      //   payload: {
      //     alertType: "success",
      //     alertText: "Successfully Logged Out",
      //   },
      // });
      dispatch({ type: "CLEAR_USER" });
      displayAlert("success", "Successfully logged out");
      setTimeout(() => {
        clearAlert();
      }, 1500);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, handleauthChange, registerFunc, loginFunc, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuthContext };
