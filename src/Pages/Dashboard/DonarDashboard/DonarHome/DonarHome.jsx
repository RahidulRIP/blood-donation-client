import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { 
  FaEdit, 
  FaTrashAlt, 
  FaEye, 
  FaCheck, 
  FaTimes, 
  FaArrowRight, 
  FaTint,
  FaMapMarkerAlt
} from "react-icons/fa";

const DonarHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: donationReqData = [], refetch } = useQuery({
    queryKey: ["donationReqData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/create-donation-request?email=${user?.email}`
      );
      return res?.data;
    },
  });

  const handleDeleteDonarReq = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/create-donation-request/${id}`).then((res) => {
            if (res?.data?.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      {donationReqData.length ? (
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm border-l-8 border-red-500">
            <div>
              <h2 className="text-2xl md:text-3xl text-gray-800">
                Welcome, <span className="font-bold text-red-600">{user?.displayName}</span>!
              </h2>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <FaTint className="text-red-500" /> Every drop you give matters.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
               <div className="stats shadow">
                  <div className="stat place-items-center">
                    <div className="stat-title">Recent Requests</div>
                    <div className="stat-value text-red-500">{donationReqData.length}</div>
                  </div>
               </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="py-4 pl-6">#</th>
                    <th>Recipient Info</th>
                    <th>Location</th>
                    <th>Date & Time</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {donationReqData.map((data, i) => (
                    <tr key={data._id} className="hover:bg-red-50 transition-colors duration-200">
                      <th className="pl-6 text-gray-400">{i + 1}</th>
                      
                      {/* Recipient Name */}
                      <td>
                        <div className="font-bold text-gray-800">{data?.recipient_name}</div>
                      </td>

                      {/* Location */}
                      <td>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>{data?.recipient_upazila}, {data?.recipient_district}</span>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td>
                        <div className="text-sm">
                          <div className="font-medium text-gray-800">{data?.donation_date}</div>
                          <div className="text-xs text-gray-500">{data?.donation_time}</div>
                        </div>
                      </td>

                      {/* Blood Group */}
                      <td>
                        <div className="badge badge-error badge-outline font-bold">
                          {data?.recipient_blood_group}
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <div className={`badge font-medium ${
                            data?.donation_status === 'inprogress' ? 'badge-warning' : 
                            data?.donation_status === 'done' ? 'badge-success text-white' : 'badge-ghost'
                        }`}>
                          {data?.donation_status}
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          {/* Edit */}
                          <div className="tooltip" data-tip="Edit">
                            <Link
                              to={`/dashboard/updateDonarReqData/${data._id}`}
                              className="btn btn-square btn-sm btn-ghost text-blue-600 hover:bg-blue-100"
                            >
                              <FaEdit size={16} />
                            </Link>
                          </div>

                          {/* Delete */}
                          <div className="tooltip" data-tip="Delete">
                            <button
                              onClick={() => handleDeleteDonarReq(`${data._id}`)}
                              className="btn btn-square btn-sm btn-ghost text-red-600 hover:bg-red-100"
                            >
                              <FaTrashAlt size={16} />
                            </button>
                          </div>

                          {/* View Details */}
                          <div className="tooltip" data-tip="View Details">
                            <Link
                              to={`/dashboard/detailsDonarReqData/${data._id}`}
                              className="btn btn-square btn-sm btn-ghost text-gray-600 hover:bg-gray-200"
                              state={donationReqData}
                            >
                              <FaEye size={16} />
                            </Link>
                          </div>

                          {/* In Progress Specific Actions */}
                          {data?.donation_status === "inprogress" && (
                            <div className="flex gap-1 ml-2 pl-2 border-l border-gray-300">
                                <div className="tooltip" data-tip="Mark Done">
                                  <button className="btn btn-square btn-sm btn-success text-white">
                                    <FaCheck size={14} />
                                  </button>
                                </div>
                                <div className="tooltip" data-tip="Cancel">
                                  <button className="btn btn-square btn-sm btn-error text-white">
                                    <FaTimes size={14} />
                                  </button>
                                </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex justify-center mt-8">
            <Link
              to={"/dashboard/my-donation-requests"}
              type="button"
              className="btn btn-primary text-black btn-wide shadow-lg gap-2"
            >
              View My All Requests <FaArrowRight />
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DonarHome;