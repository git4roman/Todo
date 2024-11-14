import { createContext, useContext, useReducer } from "react";

const initialAlertState = {
  showAlert: false,
  alertType: "",
  alertText: "",
};

const AlertContext = createContext();

const alertReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.alertType,
        alertText: action.payload.alertText,
      };
    case "CLEAR_ALERT":
      return { ...state, showAlert: false, alertType: "", alertText: "" };
    default:
      return state;
  }
};

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialAlertState);

  const displayAlert = (alertType, alertText) => {
    dispatch({
      type: "SHOW_ALERT",
      payload: { alertType, alertText },
    });
  };

  const clearAlert = () => {
    dispatch({ type: "CLEAR_ALERT" });
  };

  return (
    <AlertContext.Provider value={{ ...state, displayAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlertContext = () => {
  return useContext(AlertContext);
};

export { AlertProvider, useAlertContext };
