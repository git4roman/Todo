import { Children, createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const AuthContext = createContext();

const initialState = {
  user: null,
};

const AuthProvider = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{}}>{Children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuthContext };
