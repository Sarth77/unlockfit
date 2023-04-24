import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
export default function AuthRedirect({ children }) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Navigate to="/" /> : children;
}
