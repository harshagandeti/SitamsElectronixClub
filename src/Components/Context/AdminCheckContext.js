import { createContext, useEffect, useReducer } from "react";
import AdminCheckReducer from "./AdminCheckReducer";

const INITIAL_STATE = {
  AdminCheck: sessionStorage.getItem("Admin") || false,
};

export const AdminCheckContext = createContext(INITIAL_STATE);

export const AdminCheckContextProvider = ({ children }) => {
  const [state, dispatcher] = useReducer(AdminCheckReducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem("Admin", state.AdminCheck);
  }, [state.AdminCheck]);

  return (
    <AdminCheckContext.Provider
      value={{ AdminCheck: JSON.parse(state.AdminCheck), dispatcher }}
    >
      {children}
    </AdminCheckContext.Provider>
  );
};