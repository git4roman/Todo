import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useAlertContext } from "../context/alertContext";
import { toast, ToastContainer } from "react-toastify";

const Toast = () => {
  const { showAlert, alertType, alertText, clearAlert } = useAlertContext();

  useEffect(() => {
    if (showAlert && alertText) {
      switch (alertType) {
        case "success":
          toast.success(alertText);
          break;
        case "error":
          toast.error(alertText);
          break;
        case "info":
          toast.info(alertText);
          break;
        case "warning":
          toast.warn(alertText);
          break;
        default:
          return;
      }

      // Clear the alert after the toast has been displayed
      setTimeout(() => {
        clearAlert();
      }, 2000);
    }
  }, [showAlert]); // Dependencies to run useEffect when these change

  return <ToastContainer position="top-center" autoClose={500} />;
};

export default Toast;
