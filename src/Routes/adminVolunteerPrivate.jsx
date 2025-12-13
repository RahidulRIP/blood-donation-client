import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const AdminVolunteerPrivate = ({ children }) => {
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

  if (loading || isLoading) {
    return <Loader />;
  }

  if (userData?.role === "admin" || userData?.role === "volunteer") {
    return children;
  }

  if (userData?.role !== "admin" || userData?.role !== "volunteer") {
    signUserOut();
    return <Navigate to="/login" />;
  }

  return <Navigate to="/login" />;
};

export default AdminVolunteerPrivate;
