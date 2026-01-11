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
    <div className="space-y-6 animate-fadeIn pb-10">
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
                Hello, <span className="text-red-600">{user?.displayName}</span>
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

// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../../../hooks/useAuth";
// import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
// import {
//   FaEdit,
//   FaMapMarkerAlt,
//   FaTimes,
//   FaTint,
//   FaTrashAlt,
//   FaSearch,
// } from "react-icons/fa";
// import { FaCheck, FaEye, FaFilter, FaDroplet } from "react-icons/fa6";
// import { Link } from "react-router";
// import Swal from "sweetalert2";
// import { useEffect, useState } from "react";
// import Loader from "../../../../../Components/Shared/Loader";
// import { toast } from "react-toastify";

// const AllBloodDonationRequest = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [filteredData, setFilteredData] = useState([]);

//   // States for filters and loading
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
//   const [isProcessing, setIsProcessing] = useState(null); // Stores ID of being updated item

//   const { data: donationReqData = [], refetch, isFetching } = useQuery({
//     queryKey: ["donationReqData", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/create-donation-request/all-data`);
//       return res?.data;
//     },
//   });

//   const { data: userData = {}, isLoading } = useQuery({
//     queryKey: ["userData", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users?email=${user?.email}`);
//       return res?.data[0];
//     },
//     enabled: !!user?.email,
//   });

//   useEffect(() => {
//     let result = donationReqData;
//     if (searchTerm) {
//       result = result.filter((item) =>
//         item.recipient_name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (selectedStatus) {
//       result = result.filter((item) =>
//         item.donation_status.toLowerCase() === selectedStatus.toLowerCase()
//       );
//     }
//     if (selectedBloodGroup) {
//       result = result.filter((item) =>
//         item.recipient_blood_group === selectedBloodGroup
//       );
//     }
//     setFilteredData(result);
//     setCurrentPage(1);
//   }, [donationReqData, searchTerm, selectedStatus, selectedBloodGroup]);

//   // Handlers
//   const handleDeleteDonarReq = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/create-donation-request/${id}`).then((res) => {
//           if (res?.data?.deletedCount) {
//             refetch();
//             Swal.fire("Deleted!", "Request has been removed.", "success");
//           }
//         });
//       }
//     });
//   };

//   const handleDoneAndCancel = async (id, status) => {
//     setIsProcessing(id); // Start mini-loader for this specific row
//     try {
//       const res = await axiosSecure.patch(`/mark-done-cancel/${id}`, status);
//       if (res?.data?.data?.modifiedCount > 0) {
//         await refetch();
//         toast.success(res?.data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update status");
//     } finally {
//       setIsProcessing(null); // Stop mini-loader
//     }
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   if (isLoading) return <Loader />;

//   return (
//     <div className="space-y-6 animate-fadeIn">
//       {/* Header Section */}
//       <div className="bg-base-200 p-6 rounded-2xl border-l-8 border-red-600 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="flex items-center gap-4">
//           <div className="p-3 bg-base-100 rounded-full shadow-inner">
//              <FaTint size={32} className="text-red-600 animate-pulse" title="Blood Donation Logo" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-black">
//               Welcome, <span className="text-red-600">{user?.displayName}</span>
//             </h2>
//             <p className="opacity-70 text-sm">Requests Management Dashboard</p>
//           </div>
//         </div>
//         <div className="stats shadow bg-base-100">
//           <div className="stat">
//             <div className="stat-title text-xs font-bold uppercase">Requests</div>
//             <div className="stat-value text-red-600 text-3xl">
//               {isFetching ? <span className="loading loading-spinner loading-sm"></span> : filteredData.length}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Control Panel */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-base-200 p-4 rounded-xl shadow-inner">
//         <div className="relative">
//           <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
//           <input
//             type="text"
//             placeholder="Search Recipient..."
//             className="input input-bordered w-full pl-10 bg-base-100 focus:border-red-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <FaFilter className="text-red-600 shrink-0" />
//           <select
//             className="select select-bordered w-full bg-base-100"
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//           >
//             <option value="">All Statuses</option>
//             <option value="pending">Pending</option>
//             <option value="inprogress">In Progress</option>
//             <option value="done">Done</option>
//             <option value="cancel">Cancel</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <FaDroplet className="text-red-600 shrink-0" />
//           <select
//             className="select select-bordered w-full bg-base-100"
//             value={selectedBloodGroup}
//             onChange={(e) => setSelectedBloodGroup(e.target.value)}
//           >
//             <option value="">All Blood Groups</option>
//             {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
//               <option key={group} value={group}>{group}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead className="bg-base-200 text-base-content uppercase text-[10px] font-black tracking-widest">
//               <tr>
//                 <th className="py-5">#</th>
//                 <th>Recipient</th>
//                 <th>Donor</th>
//                 <th>Location</th>
//                 <th>Schedule</th>
//                 <th>Blood</th>
//                 <th>Status</th>
//                 <th className="text-center">Manage</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((data, i) => (
//                 <tr key={data._id} className="hover:bg-base-200/50 transition-all border-b border-base-300 last:border-0">
//                   <td className="opacity-50 font-mono text-xs">{startIndex + i + 1}</td>
//                   <td className="font-bold">{data?.recipient_name}</td>
//                   <td>
//                     <div className="text-xs font-semibold">{data?.blood_donor_name || "Unassigned"}</div>
//                     <div className="text-[10px] opacity-60 uppercase">{data?.blood_donor_email || "N/A"}</div>
//                   </td>
//                   <td>
//                     <div className="flex items-center gap-1 opacity-80 text-xs">
//                       <FaMapMarkerAlt className="text-red-600" />
//                       {data?.recipient_upazila}
//                     </div>
//                   </td>
//                   <td>
//                     <div className="text-xs font-bold">{data?.donation_date}</div>
//                     <div className="text-[10px] opacity-60">{data?.donation_time}</div>
//                   </td>
//                   <td>
//                     <div className="badge badge-error badge-sm font-black text-[10px]">{data?.recipient_blood_group}</div>
//                   </td>
//                   <td>
//                     <span className={`badge badge-xs p-2 font-bold uppercase text-[9px] ${
//                       data?.donation_status === "inprogress" ? "badge-warning" :
//                       data?.donation_status === "done" ? "badge-success text-white" :
//                       data?.donation_status === "cancel" ? "badge-error text-white" : "badge-ghost"
//                     }`}>
//                       {data?.donation_status}
//                     </span>
//                   </td>
//                   <td className="text-center">
//                     <div className="flex items-center justify-center gap-1">
//                       {/* Processing Loader or Action Buttons */}
//                       {isProcessing === data._id ? (
//                         <span className="loading loading-spinner loading-xs text-red-600"></span>
//                       ) : (
//                         <>
//                           {(userData?.role === "volunteer" || userData?.role === "admin") && (
//                             <div className="join mr-2">
//                               <button
//                                 onClick={() => handleDoneAndCancel(data._id, { donation_status: "done" })}
//                                 disabled={data.donation_status !== "inprogress"}
//                                 className="btn btn-square btn-xs join-item btn-success text-white"
//                                 title="Mark as Done"
//                               >
//                                 <FaCheck size={10} />
//                               </button>
//                               <button
//                                 onClick={() => handleDoneAndCancel(data._id, { donation_status: "cancel" })}
//                                 disabled={data.donation_status !== "inprogress"}
//                                 className="btn btn-square btn-xs join-item btn-error text-white"
//                                 title="Cancel Request"
//                               >
//                                 <FaTimes size={10} />
//                               </button>
//                             </div>
//                           )}
//                           {userData?.role === "admin" && (
//                             <div className="flex gap-1 pl-2 border-l border-base-300">
//                               <Link to={`/dashboard/updateDonarReqData/${data._id}`} className="btn btn-ghost btn-xs text-info" title="Edit Request">
//                                 <FaEdit size={14} />
//                               </Link>
//                               <button onClick={() => handleDeleteDonarReq(data._id)} className="btn btn-ghost btn-xs text-error" title="Delete Permanent">
//                                 <FaTrashAlt size={14} />
//                               </button>
//                               <Link to={`/dashboard/detailsDonarReqData/${data._id}`} className="btn btn-ghost btn-xs" title="View Full Details">
//                                 <FaEye size={14} />
//                               </Link>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6">
//           <div className="join bg-base-200 shadow-md">
//             {[...Array(totalPages).keys()].map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page + 1)}
//                 className={`join-item btn btn-sm ${currentPage === page + 1 ? "btn-error text-white shadow-lg" : "btn-ghost opacity-60"}`}
//               >
//                 {page + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllBloodDonationRequest;

// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../../../hooks/useAuth";
// import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
// import {
//   FaEdit,
//   FaMapMarkerAlt,
//   FaTimes,
//   FaTint,
//   FaTrashAlt,
// } from "react-icons/fa";
// import { FaCheck, FaEye, FaFilter } from "react-icons/fa6";
// import { Link } from "react-router";
// import Swal from "sweetalert2";
// import { useEffect, useState } from "react";
// import Loader from "../../../../../Components/Shared/Loader";
// import { toast } from "react-toastify";

// const AllBloodDonationRequest = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [filteredData, setFilteredData] = useState([]);

//   const { data: donationReqData = [], refetch } = useQuery({
//     queryKey: ["donationReqData", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/create-donation-request/all-data`);
//       return res?.data;
//     },
//   });

//   const { data: userData = {}, isLoading } = useQuery({
//     queryKey: ["userData", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users?email=${user?.email}`);
//       return res?.data[0];
//     },
//     enabled: !!user?.email,
//   });

//   useEffect(() => {
//     setFilteredData(donationReqData);
//   }, [donationReqData]);

//   // sort start
//   const handleStatusValue = (value) => {
//     const filteredByStatus = donationReqData.filter((data) =>
//       data.donation_status.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filteredByStatus);
//   };
//   // sort end

//   // pagination start here
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );
//   // pagination end here
//   const handleDeleteDonarReq = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/create-donation-request/${id}`).then((res) => {
//           if (res?.data?.deletedCount) {
//             refetch();
//             Swal.fire("Deleted!", "Your file has been deleted.", "success");
//           }
//         });
//       }
//     });
//   };

//   const handleDoneAndCancel = async (id, status) => {
//     try {
//       const res = await axiosSecure.patch(`/mark-done-cancel/${id}`, status);
//       if (res?.data?.data?.modifiedCount > 0) {
//         refetch();
//         toast.success(res?.data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (isLoading) return <Loader />;

//   return (
//     <div>
//       {/* Header */}
//       <div className="md:flex items-center justify-between gap-5 md:mx-6 mb-6">
//         <div className="mb-8 md:flex flex-col md:flex-row justify-between items-center gap-10 bg-white p-6 rounded-xl shadow-sm border-l-8 border-red-500">
//           <div>
//             <h2 className="text-2xl md:text-3xl text-gray-800">
//               Welcome,{" "}
//               <span className="font-bold text-red-600">
//                 {user?.displayName}
//               </span>
//               !
//             </h2>
//             <p className="text-gray-500 mt-1 flex items-center gap-2">
//               <FaTint className="text-red-500" /> Requests Management Panel
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <div className="stats shadow">
//               <div className="stat place-items-center">
//                 <div className="stat-title">Total Requests</div>
//                 <div className="stat-value text-red-500">
//                   {filteredData.length}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* sort start here*/}
//         <div className="form-control w-full max-w-xs">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//             <FaFilter className="text-red-500" /> Sort By Status
//           </h2>
//           <select
//             onChange={(e) => handleStatusValue(e.target.value)}
//             defaultValue="Filter Options"
//             className="select select-bordered w-full bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500"
//           >
//             <option disabled={true}>Filter Options</option>
//             <option value="pending" className="text-blue-600 font-medium">
//               Pending
//             </option>
//             <option value="inprogress" className="text-yellow-600 font-medium">
//               In Progress
//             </option>
//             <option value="done" className="text-green-600 font-medium">
//               Done
//             </option>
//             <option value="cancel" className="text-red-600 font-medium">
//               Cancel
//             </option>
//           </select>
//         </div>
//         {/* sort end here now looking admin*/}
//       </div>

//       {/* Table */}
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
//               <tr>
//                 <th className="py-4 pl-6">#</th>
//                 <th>Recipient Name</th>
//                 <th>Donar Name</th>
//                 <th>Donor Email</th>
//                 <th>Location</th>
//                 <th>Donation Date & Time</th>
//                 <th>Blood Group</th>
//                 <th>Status</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {paginatedData.map((data, i) => (
//                 <tr
//                   key={data._id}
//                   className="hover:bg-red-50 transition-colors duration-200"
//                 >
//                   <th className="pl-6 text-gray-400">{i + 1}</th>
//                   <td className="font-bold text-gray-800">
//                     {data?.recipient_name}
//                   </td>
//                   <td className="text-gray-800">
//                     {data?.blood_donor_name || (
//                       <span className="text-red-400 font-normal">
//                         Processing...
//                       </span>
//                     )}
//                   </td>
//                   <td className="text-gray-800">
//                     {data?.blood_donor_email || (
//                       <span className="text-red-400 font-normal">
//                         Processing...
//                       </span>
//                     )}
//                   </td>
//                   <td className="flex items-center gap-1 text-sm text-gray-600">
//                     <FaMapMarkerAlt className="text-gray-400" />
//                     <span>
//                       {data?.recipient_upazila}, {data?.recipient_district}
//                     </span>
//                   </td>
//                   <td className="text-sm">
//                     <div className="font-medium text-gray-800">
//                       {data?.donation_date}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {data?.donation_time}
//                     </div>
//                   </td>
//                   <td>
//                     <div className="badge badge-error badge-outline font-bold">
//                       {data?.recipient_blood_group}
//                     </div>
//                   </td>
//                   <td>
//                     <div
//                       className={`badge font-medium ${
//                         data?.donation_status === "inprogress"
//                           ? "badge-warning"
//                           : data?.donation_status === "done"
//                           ? "badge-success text-white"
//                           : "badge-ghost"
//                       }`}
//                     >
//                       {data?.donation_status}
//                     </div>
//                   </td>

//                   {/* Actions  admin + volunteer*/}
//                   <td className="flex items-center justify-center gap-2">
//                     {(userData?.role === "volunteer" ||
//                       userData?.role === "admin") && (
//                       <>
//                         <button
//                           onClick={() =>
//                             handleDoneAndCancel(data._id, {
//                               donation_status: "done",
//                             })
//                           }
//                           disabled={
//                             data.donation_status === "cancel" ||
//                             data.donation_status === "done"
//                           }
//                           className={`btn btn-square btn-sm btn-success text-white ${
//                             data.donation_status === "cancel" ||
//                             data.donation_status === "done"
//                               ? "cursor-not-allowed"
//                               : ""
//                           }`}
//                           title="Mark Done"
//                         >
//                           <FaCheck size={14} />
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleDoneAndCancel(data._id, {
//                               donation_status: "cancel",
//                             })
//                           }
//                           disabled={
//                             data.donation_status === "cancel" ||
//                             data.donation_status === "done"
//                           }
//                           className={`btn btn-square btn-sm btn-error text-white ${
//                             data.donation_status === "cancel" ||
//                             data.donation_status === "done"
//                               ? "cursor-not-allowed"
//                               : ""
//                           }`}
//                           title="Cancel"
//                         >
//                           <FaTimes size={14} />
//                         </button>
//                       </>
//                     )}

//                     {/* only for admin  */}
//                     {userData?.role === "admin" && (
//                       <>
//                         <Link
//                           to={`/dashboard/updateDonarReqData/${data._id}`}
//                           className="btn btn-square btn-sm btn-ghost text-blue-600 hover:bg-blue-100"
//                           title="Edit"
//                         >
//                           <FaEdit size={16} />
//                         </Link>
//                         <button
//                           onClick={() => handleDeleteDonarReq(data._id)}
//                           className="btn btn-square btn-sm btn-ghost text-red-600 hover:bg-red-100"
//                           title="Delete"
//                         >
//                           <FaTrashAlt size={16} />
//                         </button>
//                         <Link
//                           to={`/dashboard/detailsDonarReqData/${data._id}`}
//                           className="btn btn-square btn-sm btn-ghost text-gray-600 hover:bg-gray-200"
//                           title="View Details"
//                         >
//                           <FaEye size={16} />
//                         </Link>

//                         {/* this is extra still now (later find out for sure) */}
//                         {/* {data.donation_status === "inprogress" && (
//                           <>
//                             <button
//                               onClick={() =>
//                                 handleDoneAndCancel(data._id, {
//                                   donation_status: "done",
//                                 })
//                               }
//                               className="btn btn-square btn-sm btn-success text-white"
//                               title="Mark Done"
//                             >
//                               <FaCheck size={14} />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleDoneAndCancel(data._id, {
//                                   donation_status: "cancel",
//                                 })
//                               }
//                               className="btn btn-square btn-sm btn-error text-white"
//                               title="Cancel"
//                             >
//                               <FaTimes size={14} />
//                             </button>
//                           </>
//                         )} */}
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-5">
//         <div className="join">
//           <button
//             className="join-item btn"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Prev
//           </button>
//           {[...Array(totalPages).keys()].map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page + 1)}
//               className={`join-item btn ${
//                 currentPage === page + 1 ? "btn-active" : ""
//               }`}
//             >
//               {page + 1}
//             </button>
//           ))}
//           <button
//             className="join-item btn"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllBloodDonationRequest;
