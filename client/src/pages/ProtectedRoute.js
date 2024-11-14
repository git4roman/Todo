import { useAuthContext } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/landing" />;
  }
  
  // Render child routes using Outlet
  return <Outlet />;
};

export default ProtectedRoute;
