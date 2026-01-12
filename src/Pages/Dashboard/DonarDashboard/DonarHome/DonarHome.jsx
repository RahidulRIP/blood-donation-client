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
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import Loader from "../../../../Components/Shared/Loader";

const DonarHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: donationReqData = [],
    refetch,
    isLoading,
  } = useQuery({
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
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/create-donation-request/${id}`).then((res) => {
            if (res?.data?.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your request has been removed.",
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

  // const handleDoneAndCancel = async (id, status) => {
  //   try {
  //     const res = await axiosSecure.patch(`/mark-done-cancel/${id}`, status);
  //     if (res?.data?.data?.modifiedCount > 0) {
  //       refetch();
  //       toast.success(res?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
   
  const { data: userData = {}} = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res?.data[0];
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="md:p-8 bg-base-200 min-h-screen font-sans pt-3.5 md:pt-0">
      {donationReqData.length ? (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-2xl shadow-sm border-l-8 border-red-600">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl text-gray-800">
                Welcome back,{" "}
                <span className="font-extrabold text-red-600">
                  {userData?.name }
                </span>
              </h2>
              <p className="text-gray-500 mt-2 flex items-center justify-center md:justify-start gap-2 text-lg">
                <FaTint className="text-red-500 animate-pulse" /> Tracking your
                life-saving contributions.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="bg-red-50 px-8 py-4 rounded-2xl border border-red-100 text-center">
                <p className="text-xs uppercase font-black text-red-600 tracking-widest mb-1">
                  Recent Requests
                </p>
                <p className="text-4xl font-black text-gray-800">
                  {donationReqData.length}
                </p>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse">
                {/* head */}
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase text-[11px] font-black tracking-widest">
                    <th className="py-6 pl-8">#</th>
                    <th>Recipient</th>
                    <th>Donor Info</th>
                    <th>Location</th>
                    <th>Schedule</th>
                    <th className="text-center">Blood</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {donationReqData.map((data, i) => (
                    <tr
                      key={data._id}
                      className="hover:bg-red-50/40 transition-colors duration-200"
                    >
                      <th className="pl-8 text-gray-400 font-mono text-sm">
                        {i + 1}
                      </th>

                      {/* Recipient */}
                      <td>
                        <div className="font-bold text-gray-800 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <FaUser size={12} />
                          </div>
                          {data?.recipient_name}
                        </div>
                      </td>

                      {/* Donor Info */}
                      <td>
                        {data?.donation_status === "inprogress" ? (
                          <div className="text-sm">
                            <p className="font-bold text-gray-800">
                              {data?.blood_donor_name}
                            </p>
                            <p className="text-xs text-gray-400 lowercase">
                              {data?.blood_donor_email}
                            </p>
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 italic">
                            Waiting for donor
                          </span>
                        )}
                      </td>

                      {/* Location */}
                      <td>
                        <div className="flex items-start gap-1 text-xs text-gray-600">
                          <FaMapMarkerAlt className="text-red-400 mt-0.5" />
                          <span>
                            {data?.recipient_upazila},<br />
                            <span className="font-semibold uppercase text-[10px]">
                              {data?.recipient_district}
                            </span>
                          </span>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td>
                        <div className="flex items-center gap-2 text-xs">
                          <FaCalendarAlt className="text-blue-400" />
                          <div>
                            <p className="font-bold text-gray-800">
                              {data?.donation_date}
                            </p>
                            <p className="text-gray-400 font-medium">
                              {data?.donation_time}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Blood Group */}
                      <td className="text-center">
                        <span className="inline-block bg-red-600 text-white text-xs font-black px-3 py-1 rounded-md shadow-sm">
                          {data?.recipient_blood_group}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="text-center">
                        <div
                          className={`badge badge-sm border-none font-bold py-3 px-4 uppercase text-[10px] ${
                            data?.donation_status === "inprogress"
                              ? "bg-amber-100 text-amber-700"
                              : data?.donation_status === "done"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {data?.donation_status}
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex items-center justify-center gap-1">
                          <Link
                            to={`/dashboard/updateDonarReqData/${data._id}`}
                            className="btn btn-square btn-ghost btn-xs text-blue-500 hover:bg-blue-50"
                          >
                            <FaEdit size={14} />
                          </Link>

                          <button
                            onClick={() => handleDeleteDonarReq(`${data._id}`)}
                            className="btn btn-square btn-ghost btn-xs text-red-500 hover:bg-red-50"
                          >
                            <FaTrashAlt size={14} />
                          </button>

                          <Link
                            to={`/dashboard/detailsDonarReqData/${data._id}`}
                            className="btn btn-square btn-ghost btn-xs text-gray-500 hover:bg-gray-100"
                            state={donationReqData}
                          >
                            <FaEye size={14} />
                          </Link>

                          {/* {data.donation_status === "inprogress" && (
                            <div className="flex gap-1 ml-2 border-l pl-2 border-gray-100">
                              <button
                                onClick={() => handleDoneAndCancel(data._id, { donation_status: "done" })}
                                className="btn btn-xs btn-success text-white px-3 lowercase font-bold"
                              >
                                Done
                              </button>
                              <button
                                onClick={() => handleDoneAndCancel(data._id, { donation_status: "cancel" })}
                                className="btn btn-xs btn-error text-white px-3 lowercase font-bold"
                              >
                                Cancel
                              </button>
                            </div>
                          )} */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex justify-center pb-10">
            <Link
              to={"/dashboard/my-donation-requests"}
              className="group btn btn-wide bg-gray-900 hover:bg-red-600 text-white border-none rounded-full shadow-xl transition-all duration-300 gap-3"
            >
              View All Requests
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-dashed border-gray-300">
            <FaTint className="text-gray-200 text-8xl mx-auto mb-4" />
            <h2 className="text-3xl text-gray-400 font-bold mb-6">
              No Requests Created Yet
            </h2>
            <Link
              to="/dashboard/create-donation-request"
              className="btn btn-error text-white px-8 rounded-full"
            >
              Create Your First Request
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonarHome;