import { Navigate, useLocation } from "react-router";
import Loader from "../Components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (user) {
    return children;
  }
  if (loading) {
    return <Loader />;
  }
  return <Navigate to={"/login"} state={location?.pathname}></Navigate>;
};

export default PrivateRoute;
