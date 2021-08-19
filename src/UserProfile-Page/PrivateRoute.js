import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../Login-Page/auth-context";

export function PrivateRoute({ login, path, ...props }) {
  const { isUserLoggedIn } = useAuth();

  return isUserLoggedIn === true ? (
    <Route {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}