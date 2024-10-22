import React from "react";
import { AppProvider } from "./appContext";
import { AuthProvider } from "./authContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  );
};

export default AppProviders;
