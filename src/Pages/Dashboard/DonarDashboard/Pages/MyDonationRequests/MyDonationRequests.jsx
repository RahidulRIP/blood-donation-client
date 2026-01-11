import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router";
import { 
  FaCheck, FaEdit, FaEye, FaFilter, FaMapMarkerAlt, 
  FaTimes, FaTint, FaTrashAlt, FaSearch, 
  FaArrowLeft, FaChartPie, FaCalendarAlt
} from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import Loader from "../../../../../Components/Shared/Loader";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: donationReqData = [], refetch, isLoading } = useQuery({
    queryKey: ["donationReqData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data?email=${user?.email}`);
      return res?.data;
    },
  });

  const processedData = useMemo(() => {
    let result = [...donationReqData];
    if (searchTerm) {
      result = result.filter((item) =>
        item.recipient_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      result = result.filter((item) => item.donation_status === statusFilter);
    }
    result.sort((a, b) => {
      const dateA = new Date(a.donation_date);
      const dateB = new Date(b.donation_date);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
    return result;
  }, [donationReqData, searchTerm, statusFilter, sortOrder]);

  const chartData = useMemo(() => {
    const counts = { pending: 0, inprogress: 0, done: 0, cancel: 0 };
    donationReqData.forEach((item) => {
      const s = item.donation_status.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(counts, s)) counts[s]++;
    });

    return [
      { name: `Pending (${counts.pending})`, value: counts.pending, color: "#94a3b8" },
      { name: `In Progress (${counts.inprogress})`, value: counts.inprogress, color: "#f59e0b" },
      { name: `Done (${counts.done})`, value: counts.done, color: "#22c55e" },
      { name: `Canceled (${counts.cancel})`, value: counts.cancel, color: "#ef4444" },
    ];
  }, [donationReqData]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/mark-done-cancel/${id}`, { donation_status: status });
      if (res?.data?.data?.modifiedCount > 0) {
        refetch();
        toast.success(`Updated to ${status}`, { position: "top-center" });
      }
    } catch (err) { toast.error("Update failed"); }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "This record will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Delete Request",
      background: '#fff',
      customClass: { popup: 'rounded-3xl' }
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axiosSecure.delete(`/create-donation-request/${id}`);
        refetch();
        Swal.fire("Deleted!", "Your request has been removed.", "success");
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className=" p-4 md:p-8 space-y-8 animate-fadeIn bg-base-200 min-h-screen">
      
      {/* --- PREMIUM HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 text-xs font-black text-gray-400 hover:text-red-600 transition-all mb-4 tracking-widest"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> BACK TO OVERVIEW
          </button>
          <h1 className="text-4xl font-black  tracking-tight">
            My Donation <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Requests</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Manage and track your blood donation history</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
               <FaTint className="text-red-500 text-xl animate-pulse" />
             </div>
             <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Total Lifetime</p>
               <p className="text-2xl font-black text-gray-800">{donationReqData.length}</p>
             </div>
           </div>
        </div>
      </div>

      {/* --- ANALYTICS & FILTERS GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHART CARD */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-6 flex items-center gap-2">
            <FaChartPie className="text-red-500" /> Live Statistics
          </h3>
          <div className="h-[240px] w-full relative">
            {donationReqData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={chartData} 
                      innerRadius={60} 
                      outerRadius={85} 
                      paddingAngle={10} 
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} 
                    />
                    <Legend 
                      verticalAlign="bottom"
                      iconType="circle" 
                      wrapperStyle={{ fontSize: '11px', fontWeight: '800', paddingTop: '20px' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text for Chart */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 text-center pointer-events-none">
                  <p className="text-2xl font-black text-gray-800">{donationReqData.length}</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Requests</p>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-300 italic text-sm">No data available</div>
            )}
          </div>
        </div>

        {/* SEARCH & FILTERS CARD */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-center">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-8 flex items-center gap-2">
            <FaFilter className="text-red-500" /> Dynamic Filtering
          </h3>
          
          <div className="space-y-6">
            <div className="relative">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" />
              <input 
                type="text" 
                placeholder="Find recipient by name..." 
                className="input input-lg w-full pl-14 bg-gray-50 text-gray-500 border-none focus:ring-2 focus:ring-red-500/20 transition-all rounded-[1.5rem] text-sm font-medium" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 ml-2 uppercase tracking-widest">Status Filter</label>
                <select 
                  className="select select-bordered w-full bg-gray-50 border-none rounded-2xl font-bold text-gray-600 focus:ring-2 focus:ring-red-500/20" 
                  value={statusFilter} 
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Completed</option>
                  <option value="cancel">Canceled</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 ml-2 uppercase tracking-widest">Sort By Date</label>
                <select 
                  className="select select-bordered w-full bg-gray-50 border-none rounded-2xl font-bold text-gray-600 focus:ring-2 focus:ring-red-500/20" 
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="text-gray-400 text-[11px] font-black uppercase tracking-[0.15em] bg-gray-50/50 border-b border-gray-100">
                <th className="py-7 pl-10">ID</th>
                <th>Recipient Details</th>
                <th>Location</th>
                <th>Donation Schedule</th>
                <th>Status</th>
                <th className="text-center pr-10">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.map((data, i) => (
                <tr key={data._id} className="group hover:bg-gray-50/80 transition-all">
                  <td className="pl-10 text-gray-300 font-mono text-[10px]">#{(currentPage-1)*itemsPerPage + i + 1}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-black text-gray-800 text-sm group-hover:text-red-600 transition-colors">{data.recipient_name}</span>
                      <span className="inline-flex items-center justify-center w-fit bg-red-600 text-[9px] font-black text-white px-2 py-0.5 rounded-md mt-1.5 shadow-sm shadow-red-200 uppercase">
                        {data.recipient_blood_group}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                        <FaMapMarkerAlt className="text-red-400" /> {data.recipient_upazila}
                      </div>
                      <span className="text-[10px] font-medium text-gray-400 pl-5 uppercase">{data.recipient_district}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                        <FaCalendarAlt className="text-gray-300" /> {data.donation_date}
                      </div>
                      <span className="text-[10px] font-medium text-gray-400 pl-5">{data.donation_time}</span>
                    </div>
                  </td>
                  <td>
                    <div className={`badge badge-md border-none px-4 py-3 rounded-xl font-black text-[9px] uppercase tracking-tighter ${
                      data.donation_status === "inprogress" ? "bg-amber-100 text-amber-600" : 
                      data.donation_status === "done" ? "bg-emerald-100 text-emerald-600" : 
                      data.donation_status === "cancel" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {data.donation_status}
                    </div>
                  </td>
                  <td className="pr-10">
                    <div className="flex items-center justify-end gap-3">
                       <Link to={`/dashboard/updateDonarReqData/${data._id}`} className="p-2.5 bg-white shadow-sm border border-gray-100 text-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all"><FaEdit size={16}/></Link>
                       <button onClick={() => handleDelete(data._id)} className="p-2.5 bg-white shadow-sm border border-gray-100 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all"><FaTrashAlt size={16}/></button>
                       <Link to={`/dashboard/detailsDonarReqData/${data._id}`} className="p-2.5 bg-white shadow-sm border border-gray-100 text-gray-400 rounded-2xl hover:bg-gray-800 hover:text-white hover:-translate-y-1 transition-all"><FaEye size={16}/></Link>
                       
                       {/* {data.donation_status === "inprogress"  && (
                         <div className="flex gap-2 ml-4 pl-4 border-l border-gray-100">
                            <button onClick={() => handleUpdateStatus(data._id, "done")} className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 border-none text-white rounded-xl shadow-lg shadow-emerald-200" title="Mark Done"><FaCheck /></button>
                            <button onClick={() => handleUpdateStatus(data._id, "cancel")} className="btn btn-sm bg-rose-500 hover:bg-rose-600 border-none text-white rounded-xl shadow-lg shadow-rose-200" title="Cancel"><FaTimes /></button>
                         </div>
                       )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {processedData.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center gap-4 bg-white">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <FaSearch size={30} className="text-gray-200" />
              </div>
              <p className="text-gray-400 font-bold italic">No matching blood requests found.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- PAGINATION --- */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <div className="join p-1 bg-white shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100">
            {[...Array(totalPages).keys()].map(p => (
              <button 
                key={p} 
                onClick={() => setCurrentPage(p + 1)} 
                className={`join-item btn btn-md border-none px-6 rounded-xl transition-all ${currentPage === p + 1 ? "bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700" : "bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-800"}`}
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

export default MyDonationRequests;









// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
// import useAuth from "../../../../../hooks/useAuth";
// import { Link } from "react-router";
// import Swal from "sweetalert2";
// import { useEffect, useState } from "react";
// import {
//   FaCheck,
//   FaEdit,
//   FaEye,
//   FaFilter,
//   FaMapMarkerAlt,
//   FaTimes,
//   FaTint,
//   FaTrashAlt,
// } from "react-icons/fa";

// const MyDonationRequests = () => {
//   const axiosSecure = useAxiosSecure();

//   const { user } = useAuth();

//   const { data: donationReqData = [], refetch } = useQuery({
//     queryKey: ["donationReqData", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/create-donation-request/all-data?email=${user?.email}`
//       );
//       return res?.data;
//     },
//   });

//   const [filteredData, setFilteredData] = useState([]);

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
//   //   ............................................

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage); //edit here donationReqData.length
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   //page reset(sort)
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filteredData]);

//   //   ............................................

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
//         try {
//           axiosSecure.delete(`/create-donation-request/${id}`).then((res) => {
//             if (res?.data?.deletedCount) {
//               refetch();
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success",
//               });
//             }
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     });
//   };

//   return (
//     <div>
//       <div className="md:flex items-center justify-between mx-6 mb-6">
//         {/* Header Section start*/}
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
//               <FaTint className="text-red-500" /> Every drop you give matters.
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
//         {/* Header Section end*/}

//         {/* sort status  start*/}
//         <div className="form-control w-full max-w-xs">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//             <FaFilter className="text-red-500" /> Sort By Status
//           </h2>

//           <select
//             onChange={(e) => handleStatusValue(e.target.value)}
//             defaultValue="Filter Options"
//             className="select select-bordered w-full bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 appearance-none"
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
//               Canceled
//             </option>
//           </select>
//         </div>
//         {/* sort status  end*/}
//       </div>

//       {/* tabile  */}
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//         <div className=" overflow-x-auto">
//           <table className="table w-full">
//             {/* head */}
//             <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
//               <tr>
//                 <th className="py-4 pl-6">#</th>
//                 <th>Recipient Info</th>
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
//                   <td className="pl-6 text-gray-400">{i + 1}</td>

//                   {/* Recipient Name */}
//                   <td>
//                     <div className="font-bold text-gray-800">
//                       {data?.recipient_name}
//                     </div>
//                   </td>

//                   {/* Location */}
//                   <td>
//                     <div className="flex items-center gap-1 text-sm text-gray-600">
//                       <FaMapMarkerAlt className="text-gray-400" />
//                       <span>
//                         {data?.recipient_upazila}, {data?.recipient_district}
//                       </span>
//                     </div>
//                   </td>

//                   {/* Date & Time */}
//                   <td>
//                     <div className="text-sm">
//                       <div className="font-medium text-gray-800">
//                         {data?.donation_date}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {data?.donation_time}
//                       </div>
//                     </div>
//                   </td>

//                   {/* Blood Group */}
//                   <td>
//                     <div className="badge badge-error badge-outline font-bold">
//                       {data?.recipient_blood_group}
//                     </div>
//                   </td>

//                   {/* Status */}
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

//                   {/* Actions */}
//                   <td>
//                     <div className="flex items-center justify-center gap-2">
//                       {/* Edit */}
//                       <div className="tooltip" data-tip="Edit">
//                         <Link
//                           to={`/dashboard/updateDonarReqData/${data._id}`}
//                           className="btn btn-square btn-sm btn-ghost text-blue-600 hover:bg-blue-100"
//                         >
//                           <FaEdit size={16} />
//                         </Link>
//                       </div>

//                       {/* Delete */}
//                       <div className="tooltip" data-tip="Delete">
//                         <button
//                           onClick={() => handleDeleteDonarReq(`${data._id}`)}
//                           className="btn btn-square btn-sm btn-ghost text-red-600 hover:bg-red-100"
//                         >
//                           <FaTrashAlt size={16} />
//                         </button>
//                       </div>

//                       {/* View Details */}
//                       <div className="tooltip" data-tip="View Details">
//                         <Link
//                           to={`/dashboard/detailsDonarReqData/${data._id}`}
//                           className="btn btn-square btn-sm btn-ghost text-gray-600 hover:bg-gray-200"
//                           state={donationReqData}
//                         >
//                           <FaEye size={16} />
//                         </Link>
//                       </div>

//                       {/*conditional Actions (still no need of this later have to delete)*/}
//                       {data?.donation_status === "inprogress" && (
//                         <div className="flex gap-1 ml-2 pl-2 border-l border-gray-300">
//                           <div className="tooltip" data-tip="Mark Done">
//                             <button className="btn btn-square btn-sm btn-success text-white">
//                               <FaCheck size={14} />
//                             </button>
//                           </div>
//                           <div className="tooltip" data-tip="Cancel">
//                             <button className="btn btn-square btn-sm btn-error text-white">
//                               <FaTimes size={14} />
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div>
//         {/* ..................... */}
//         <div className="flex justify-center mt-5">
//           <div className="join">
//             <button
//               className="join-item btn"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//             >
//               Prev
//             </button>

//             {[...Array(totalPages).keys()].map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page + 1)}
//                 className={`join-item btn ${
//                   currentPage === page + 1 ? "btn-active" : ""
//                 }`}
//               >
//                 {page + 1}
//               </button>
//             ))}

//             <button
//               className="join-item btn"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//         {/* .................... */}
//       </div>
//     </div>
//   );
// };

// export default MyDonationRequests;
