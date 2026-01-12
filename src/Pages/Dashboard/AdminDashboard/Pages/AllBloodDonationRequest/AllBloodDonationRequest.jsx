import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaTimes,
  FaTint,
  FaTrashAlt,
  FaSearch,
} from "react-icons/fa";
import { FaCheck, FaEye, FaFilter, FaDroplet } from "react-icons/fa6";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useState, useMemo } from "react";
import Loader from "../../../../../Components/Shared/Loader";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  Text,
} from "recharts";

const AllBloodDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [isProcessing, setIsProcessing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: donationReqData = [],
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["donationReqData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data`);
      return res?.data;
    },
  });

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res?.data[0];
    },
    enabled: !!user?.email,
  });

  const filteredData = useMemo(() => {
    let result = [...donationReqData];
    if (searchTerm) {
      result = result.filter((item) =>
        item.recipient_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedStatus) {
      result = result.filter(
        (item) =>
          item.donation_status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }
    if (selectedBloodGroup) {
      result = result.filter(
        (item) => item.recipient_blood_group === selectedBloodGroup
      );
    }
    return result;
  }, [donationReqData, searchTerm, selectedStatus, selectedBloodGroup]);

  // Updated Chart Data Logic with Numbers in Labels
  const chartData = useMemo(() => {
    const counts = { pending: 0, inprogress: 0, done: 0, cancel: 0 };
    filteredData.forEach((item) => {
      const s = item.donation_status.toLowerCase();
      if (counts.hasOwnProperty(s)) counts[s]++;
    });

    return [
      {
        name: `Pending (${counts.pending})`,
        value: counts.pending,
        color: "#94a3b8",
      },
      {
        name: `In Progress (${counts.inprogress})`,
        value: counts.inprogress,
        color: "#f59e0b",
      },
      { name: `Done (${counts.done})`, value: counts.done, color: "#22c55e" },
      {
        name: `Canceled (${counts.cancel})`,
        value: counts.cancel,
        color: "#ef4444",
      },
    ].filter((d) => d.value > 0);
  }, [filteredData]);

  // Custom Label Renderer for the Pie Chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="currentColor"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[10px] font-bold fill-base-content"
      >
        {value}
      </text>
    );
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDoneAndCancel = async (id, status) => {
    setIsProcessing(id);
    try {
      const res = await axiosSecure.patch(`/mark-done-cancel/${id}`, status);
      if (res?.data?.data?.modifiedCount > 0) {
        await refetch();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error("Update failed",error.message);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleDeleteDonarReq = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Permanent action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/create-donation-request/${id}`).then((res) => {
          if (res?.data?.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "", "success");
          }
        });
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6 animate-fadeIn pb-10 pt-3.5 md:pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-base-200 p-6 rounded-2xl border-l-8 border-red-600 shadow-sm flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-base-100 rounded-full border border-base-300">
              <FaTint
                size={32}
                className="text-red-600 animate-pulse"
                title="Blood Donation Logo"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black">
                Hello, <span className="text-red-600">{userData?.name}</span>
              </h2>
              <p className="opacity-60 text-sm">
                Managing {filteredData.length} Requests
              </p>
            </div>
          </div>
          <div className="stats shadow bg-base-100 mt-4 md:mt-0">
            <div className="stat">
              <div className="stat-title text-[10px] font-bold uppercase">
                Results
              </div>
              <div className="stat-value text-red-600 text-2xl">
                {isFetching ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  filteredData.length
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Card with Data Numbers */}
        <div className="bg-base-200 p-4 rounded-2xl shadow-sm border border-base-300 h-[250px] relative">
          <h3 className="text-[10px] font-bold uppercase opacity-50 absolute top-4 left-4">
            Live Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={true}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-base-200 p-4 rounded-xl shadow-sm">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            placeholder="Search Recipient..."
            className="input input-bordered w-full pl-10 bg-base-100"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter className="text-red-600" />
          <select
            className="select select-bordered w-full bg-base-100 font-semibold"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="cancel">Cancel</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <FaDroplet className="text-red-600" />
          <select
            className="select select-bordered w-full bg-base-100 font-semibold"
            value={selectedBloodGroup}
            onChange={(e) => {
              setSelectedBloodGroup(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Blood Groups</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200 text-[10px] font-black uppercase">
              <tr>
                <th className="py-4 text-center">#</th>
                <th>Recipient</th>
                <th>Donor</th>
                <th>Location</th>
                <th>Blood</th>
                <th>Status</th>
                <th className="text-center">Manage</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((data, i) => (
                <tr
                  key={data._id}
                  className="hover:bg-base-200/40 border-b border-base-200 last:border-0"
                >
                  <td className="opacity-50 font-mono text-xs text-center">
                    {startIndex + i + 1}
                  </td>
                  <td className="font-bold">{data?.recipient_name}</td>
                  <td>
                    <div className="text-xs font-semibold">
                      {data?.blood_donor_name || "Waiting..."}
                    </div>
                    <div className="text-[9px] opacity-60 uppercase">
                      {data?.blood_donor_email || ""}
                    </div>
                  </td>
                  <td className="text-xs">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-600" />{" "}
                      {data?.recipient_upazila}
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-error badge-xs p-2 font-bold">
                      {data?.recipient_blood_group}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-xs p-2 font-bold uppercase text-[8px] ${
                        data.donation_status === "inprogress"
                          ? "badge-warning"
                          : data.donation_status === "done"
                          ? "badge-success text-white"
                          : data.donation_status === "cancel"
                          ? "badge-error text-white"
                          : "badge-ghost"
                      }`}
                    >
                      {data.donation_status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {isProcessing === data._id ? (
                        <span className="loading loading-spinner loading-xs text-red-600"></span>
                      ) : (
                        <>
                          {(userData?.role === "volunteer" ||
                            userData?.role === "admin") && (
                            <div className="join">
                              <button
                                onClick={() =>
                                  handleDoneAndCancel(data._id, {
                                    donation_status: "done",
                                  })
                                }
                                disabled={data.donation_status !== "inprogress"}
                                className="btn btn-square btn-xs join-item btn-success text-white"
                                title="Mark Done"
                              >
                                <FaCheck size={10} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDoneAndCancel(data._id, {
                                    donation_status: "cancel",
                                  })
                                }
                                disabled={data.donation_status !== "inprogress"}
                                className="btn btn-square btn-xs join-item btn-error text-white"
                                title="Cancel"
                              >
                                <FaTimes size={10} />
                              </button>
                            </div>
                          )}
                          {userData?.role === "admin" && (
                            <div className="flex gap-1 ml-2 pl-2 border-l border-base-300">
                              <Link
                                to={`/dashboard/updateDonarReqData/${data._id}`}
                                className="btn btn-ghost btn-xs text-info"
                                title="Edit"
                              >
                                <FaEdit />
                              </Link>
                              <button
                                onClick={() => handleDeleteDonarReq(data._id)}
                                className="btn btn-ghost btn-xs text-error"
                                title="Delete"
                              >
                                <FaTrashAlt />
                              </button>
                              <Link
                                to={`/dashboard/detailsDonarReqData/${data._id}`}
                                className="btn btn-ghost btn-xs"
                                title="View"
                              >
                                <FaEye />
                              </Link>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="p-10 text-center opacity-40 font-bold italic">
              No matching results.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join bg-base-200 shadow-sm border border-base-300">
            {[...Array(totalPages).keys()].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p + 1)}
                className={`join-item btn btn-sm ${
                  currentPage === p + 1
                    ? "btn-error text-white"
                    : "btn-ghost opacity-60"
                }`}
              >
                {p + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequest;
