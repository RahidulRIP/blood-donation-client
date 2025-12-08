import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader";
import DonarHome from "../../Pages/Dashboard/DonarDashboard/DonarHome/DonarHome";
import AdminHome from "../../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import VolunteerHome from "../../Pages/Dashboard/VolunteerDashboard/VolunteerHome/VolunteerHome";

const DashboardRoleBasedPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data[0];
    },
    enabled: !!user?.email,
  });

  if (!userData?.role) {
    return <Loader />;
  }

  if (userData.role === "donor") return <DonarHome />;
  if (userData.role === "admin") return <AdminHome />;
  if (userData.role === "volunteer") return <VolunteerHome />;

  return <p>No role found</p>;
};

export default DashboardRoleBasedPage;
