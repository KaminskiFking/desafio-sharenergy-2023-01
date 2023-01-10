import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ReactContext } from "../context/ReactContext";

export const PrivateRoute = () => {
  const { signed } = useContext(ReactContext);
  return signed ? <Outlet /> : <Navigate to="/" />;
};