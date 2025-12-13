import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const PrivateRouteAdmin = ({ children }) => {
  const { user, loading, signUserOut } = useAuth();
  const axiosInstance = useAxios();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user?.email}`);
      return res?.data[0];
    },
    enabled: !!user?.email,
  });
  //   console.log(userData?.role);

  if (loading || isLoading) {
    return <Loader />;
  }

  if (user && userData?.role !== "admin") {
    signUserOut();
    return <Navigate to="/login" />;
  }

  if (user && userData?.role === "admin") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRouteAdmin;
