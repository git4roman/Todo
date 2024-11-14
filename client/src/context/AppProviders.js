import React from "react";
import { AppProvider } from "./appContext";
import { AuthProvider } from "./authContext";
import { AlertProvider } from "./alertContext";

const AppProviders = ({ children }) => {
  return (
    <AlertProvider>
      <AuthProvider>
        <AppProvider>{children}</AppProvider>
      </AuthProvider>
    </AlertProvider>
  );
};

export default AppProviders;
