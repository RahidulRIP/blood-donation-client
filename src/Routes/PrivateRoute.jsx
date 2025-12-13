import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location?.pathname} />;
};

export default PrivateRoute;
