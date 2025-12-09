import { useParams, useNavigate } from "react-router";
import {
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTint,
  FaCommentDots,
  FaArrowLeft,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const DetailsDonarReqData = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: detailsData = [] } = useQuery({
    queryKey: ["donarReqSingleData", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:9000/create-donation-request/${id}`
      );
      return res?.data;
    },
  });

  const {
    donation_date,
    donation_status,
    donation_time,
    hospital_name,
    recipient_blood_group,
    recipient_district,
    recipient_full_address,
    recipient_name,
    recipient_upazila,
    request_message,
    user_email,
    user_name,
  } = detailsData;

  return (
    <div className="min-h-screen bg-base-200 p-4 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Requests
        </button>

        <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden border-l-8 border-primary">
          {/* Blood Group Left Section */}
          <div className="bg-gray-400 flex flex-col items-center justify-center text-primary-content p-8 min-w-[200px]">
            <FaTint className="text-6xl mb-2 animate-pulse" />
            <h1 className="text-5xl font-extrabold">{recipient_blood_group}</h1>
            <p className="mt-2 font-medium uppercase tracking-widest">
              Required
            </p>
            <div
              className={`mt-4 badge ${
                donation_status === "pending"
                  ? "badge-warning"
                  : "badge-success"
              } badge-lg`}
            >
              <h2>
                <span className="font-bold text-lg">Status</span> :{" "}
                {donation_status}
              </h2>
            </div>
          </div>

          {/* Details Section */}
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-3xl font-bold text-gray-800">
                  {recipient_name}
                </h2>
                <p className="text-sm text-gray-500 italic">
                  Requested by: {user_name}
                </p>
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {/* hospital_name  */}
              <div className="flex items-start gap-3">
                <FaHospital className="mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Hospital</p>
                  <p className="text-gray-600">{hospital_name}</p>
                </div>
              </div>

              {/* address and location  */}
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">
                    {recipient_upazila}, {recipient_district}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    {recipient_full_address}
                  </p>
                </div>
              </div>

              {/* Donation Date  */}
              <div className="flex items-start gap-3">
                <FaCalendarAlt className="mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Donation Date</p>
                  <p className="text-gray-600">{donation_date}</p>
                </div>
              </div>

              {/* donation_time  */}
              <div className="flex items-start gap-3">
                <FaClock className="mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-gray-600">{donation_time}</p>
                </div>
              </div>

              {/* Requester Contact  */}
              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Requester Contact</p>
                  <p className="text-gray-600">{user_email}</p>
                </div>
              </div>
            </div>

            {/* Message Box */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-dashed border-primary">
              <p className="flex items-center gap-2 font-semibold text-primary mb-1">
                <FaCommentDots /> Message:
              </p>
              <p className="text-gray-700 italic">"{request_message}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsDonarReqData;
