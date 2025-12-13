import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import { toast } from "react-toastify";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // total users
  const { data: usersData = [], refetch } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  //   update status
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/user/status/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`"${status}" status applied successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   update role
  const handleUpdateRole = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/user/role/${id}`, { role });
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`"${role}" role applied successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-red-500 pb-2">
        Registered Users Management 👥
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Status</th>
            <th>Update Status</th>
            <th>User Role</th>
            <th>Update Role</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, i) => (
            <tr key={user._id}>
              <th>{i + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user?.photoURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user?.name}</div>
                  </div>
                </div>
              </td>
              <td>{user?.email}</td>

              <td
                className={` ${
                  user?.status === "active" ? "text-green-400" : "text-red-400"
                }`}
              >
                {user?.status}
              </td>
              <td className="space-x-2.5">
                <button
                  onClick={() => handleUpdateStatus(user?._id, "blocked")}
                  className="btn bg-red-300 font-bold btn-sm"
                  disabled={user?.status === "blocked" && true}
                >
                  Block
                </button>
                <button
                  onClick={() => handleUpdateStatus(user?._id, "active")}
                  className="btn bg-green-400 font-bold  btn-sm"
                  disabled={user?.status === "active" && true}
                >
                  Active
                </button>
              </td>
              <td
                className={` ${
                  user?.role === "donor"
                    ? "text-blue-500"
                    : `${
                        user?.role === "admin"
                          ? "text-[#00d2bb]"
                          : "text-[#b0ec0b]"
                      }`
                }`}
              >
                {user?.role}
              </td>
              <td className="space-x-2.5">
                <button
                  onClick={() => handleUpdateRole(user?._id, "volunteer")}
                  className="btn btn-primary text-black font-bold btn-sm"
                  disabled={user?.role === "volunteer" && true}
                >
                  Volunteer
                </button>
                <button
                  onClick={() => handleUpdateRole(user?._id, "admin")}
                  className="btn btn-accent text-white font-bold btn-sm"
                  disabled={user?.role === "admin" && true}
                >
                  Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
