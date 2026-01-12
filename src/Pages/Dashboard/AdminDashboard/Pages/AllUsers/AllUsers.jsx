import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FaUserSlash, FaCheckCircle, FaSearch } from "react-icons/fa";
import Loader from "../../../../../Components/Shared/Loader";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const {
    data: usersData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  const filteredUsers = useMemo(() => {
    return usersData
      .filter((u) => {
        const matchesSearch =
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "all" || u.role === filterRole;
        const matchesStatus =
          filterStatus === "all" || u.status === filterStatus;
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "role")
          return (a.role || "").localeCompare(b.role || "");
        return 0;
      });
  }, [usersData, searchTerm, filterRole, filterStatus, sortBy]);

  const chartStats = useMemo(() => {
    const adminCount = usersData.filter((u) => u.role === "admin").length;
    const volunteerCount = usersData.filter(
      (u) => u.role === "volunteer"
    ).length;
    const donorCount = usersData.filter(
      (u) => u.role === "donor" || !u.role
    ).length;

    return {
      data: [
        { name: "Admins", value: adminCount, color: "#e11d48" },
        { name: "Volunteers", value: volunteerCount, color: "#2563eb" },
        { name: "Donors", value: donorCount, color: "#64748b" },
      ],
      adminCount,
      volunteerCount,
      donorCount,
    };
  }, [usersData]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/user/status/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`User status updated to ${status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRole = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/user/role/${id}`, { role });
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`Role updated to ${role}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="min-h-screen bg-base-200  lg:p-12 font-sans ">
      {/* --- HEADER SECTION --- */}
      <header className="mb-10 lg:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight uppercase leading-tight mb-6 ">
              User <span className="text-red-600">Registry</span>
            </h2>
            <div className="relative group">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-xl group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Search nodes..."
                className="w-full pl-16 pr-8 py-5 bg-white border-2 border-slate-200 rounded-2xl lg:rounded-4xl shadow-xl focus:border-red-500 outline-none transition-all text-base sm:text-lg font-semibold"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* STATS CARD - Hidden on very small screens, shown as grid on mobile/tablet */}
          <div className="w-full lg:w-auto bg-white p-6 sm:p-10 rounded-3xl lg:rounded-[3rem] shadow-2xl border border-slate-100 flex items-center gap-6 sm:gap-10">
            <div className="hidden sm:block w-32 h-32 lg:w-40 lg:h-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartStats.data}
                    innerRadius="70%"
                    outerRadius="100%"
                    paddingAngle={5}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartStats.data.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-2xl lg:text-3xl text-purple-400 font-black">
                  {usersData.length}
                </p>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col gap-6 sm:gap-8 overflow-x-auto ">
              <div className="min-w-max">
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">
                  Admins
                </p>
                <p className="text-2xl text-gray-500 sm:text-3xl font-black">
                  {chartStats.adminCount}
                </p>
              </div>
              <div className="min-w-max">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                  Volunteers
                </p>
                <p className="text-2xl text-gray-500 sm:text-3xl font-black">
                  {chartStats.volunteerCount}
                </p>
              </div>
              <div className="min-w-max">
                <p className="text-[10px] font-bold text-gray-500  uppercase tracking-widest mb-1">
                  Donors
                </p>
                <p className="text-2xl text-gray-500 sm:text-3xl font-black">
                  {chartStats.donorCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- FILTERS --- */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
        <div className="flex flex-1 gap-2">
          <select
            className="select select-bordered  rounded-xl font-bold flex-1"
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="volunteer">Volunteers</option>
            <option value="donor">Donors</option>
          </select>
          <select
            className="select select-bordered  rounded-xl font-bold flex-1"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <select
          className="select select-bordered  rounded-xl font-bold"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort: Name</option>
          <option value="role">Sort: Role</option>
        </select>
      </div>

      {/* --- DATA DISPLAY --- */}
      {/* DESKTOP TABLE VIEW */}
      <div className="hidden xl:block overflow-x-auto rounded-4xl">
        <table className="table w-full border-separate border-spacing-y-4">
          <thead>
            <tr className=" border-none uppercase text-xs font-black tracking-widest">
              <th className="pl-12 py-6">User Profile</th>
              <th>Status</th>
              <th className="text-center">Security</th>
              <th>Authorization</th>
              <th className="text-center">Modify Access</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="group">
                <td className=" rounded-l-[2.5rem] pl-10 py-6 border-y-2 border-l-2 border-slate-100 group-hover:border-red-100 transition-all">
                  <div className="flex items-center gap-6">
                    <img
                      src={user?.photoURL}
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                      alt=""
                    />
                    <div>
                      <div className="font-black text-lg  group-hover:text-red-600 transition-colors uppercase tracking-tight">
                        {user?.name}
                      </div>
                      <div className="text-xs font-bold text-gray-400 lowercase">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" py-6 border-y-2 border-slate-100 group-hover:border-red-100">
                  <span
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${
                      user?.status === "active"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}
                  >
                    {user?.status}
                  </span>
                </td>
                <td className=" py-6 border-y-2 border-slate-100 group-hover:border-red-100 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleUpdateStatus(user?._id, "blocked")}
                      disabled={user?.status === "blocked"}
                      className="btn btn-square btn-ghost  hover:bg-red-600 hover:text-white"
                    >
                      <FaUserSlash />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(user?._id, "active")}
                      disabled={user?.status === "active"}
                      className="btn btn-square btn-ghost  hover:bg-emerald-500 hover:text-white"
                    >
                      <FaCheckCircle />
                    </button>
                  </div>
                </td>
                <td className=" py-6 border-y-2 border-slate-100 group-hover:border-red-100 font-black text-sm uppercase ">
                  {user?.role || "donor"}
                </td>
                <td className=" py-6 border-y-2 border-r-2 border-slate-100 rounded-r-[2.5rem] pr-10 text-center group-hover:border-red-100">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleUpdateRole(user?._id, "volunteer")}
                      disabled={user?.role === "volunteer"}
                      className="btn btn-sm btn-outline text-[10px] rounded-xl"
                    >
                      Volunteer
                    </button>
                    <button
                      onClick={() => handleUpdateRole(user?._id, "admin")}
                      disabled={user?.role === "admin"}
                      className="btn btn-sm bg-slate-900 text-white text-[10px] rounded-xl"
                    >
                      Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE/TABLET CARD VIEW */}
      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.div
              layout
              key={user._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className=" p-6 rounded-4xl shadow-lg border border-slate-100 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <img
                  src={user?.photoURL}
                  className="w-16 h-16 rounded-2xl object-cover"
                  alt=""
                />
                <div>
                  <h4 className="font-black uppercase tracking-tight leading-tight">
                    {user?.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-bold ">
                    {user?.email}
                  </p>
                </div>
                <div
                  className={`ml-auto px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
                    user?.status === "active"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user?.status}
                </div>
              </div>

              <div className="flex items-center justify-between p-4  rounded-2xl mb-6">
                <div>
                  <p className="text-[10px] font-bold  uppercase mb-1">
                    Current Role
                  </p>
                  <p className="text-xs font-black uppercase">
                    {user?.role || "donor"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(user?._id, "blocked")}
                    className="btn btn-sm btn-circle btn-ghost text-red-500"
                  >
                    <FaUserSlash />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(user?._id, "active")}
                    className="btn btn-sm btn-circle btn-ghost text-emerald-500"
                  >
                    <FaCheckCircle />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleUpdateRole(user?._id, "volunteer")}
                  disabled={user?.role === "volunteer"}
                  className="btn btn-sm btn-outline  rounded-xl text-[10px]"
                >
                  Make Volunteer
                </button>
                <button
                  onClick={() => handleUpdateRole(user?._id, "admin")}
                  disabled={user?.role === "admin"}
                  className="btn btn-sm rounded-xl text-[10px]"
                >
                  Make Admin
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllUsers;
