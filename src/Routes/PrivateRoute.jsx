import { Navigate, useLocation } from "react-router";
;
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";

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
