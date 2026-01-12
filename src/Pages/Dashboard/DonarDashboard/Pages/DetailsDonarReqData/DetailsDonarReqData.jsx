import { useParams, useNavigate, Link } from "react-router";
import {
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTint,
  FaCommentDots,
  FaArrowLeft,
  FaUserAlt,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loader from "../../../../../Components/Shared/Loader";

const DetailsDonarReqData = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: detailsData, isLoading } = useQuery({
    queryKey: ["donarReqSingleData", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/${id}`);
      return res?.data;
    },
  });

  if (isLoading) return <Loader />;

  if (!detailsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <FaTint className="mx-auto text-5xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Request Not Found
          </h2>
          <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
            Return Home
          </button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-base-200 p-4 lg:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-slate-500 font-bold hover:text-red-600 transition-colors"
          >
            <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
              <FaArrowLeft />
            </div>
            BACK TO DASHBOARD
          </button>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                donation_status === "pending"
                  ? "bg-amber-400 animate-pulse"
                  : "bg-emerald-500"
              }`}
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
              System Status: {donation_status}
            </span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Blood Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-200">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-red-600 rounded-full blur-[80px] opacity-20"></div>

              <div className="relative z-10">
                <div className="inline-flex p-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
                  <FaTint className="text-5xl text-red-600" />
                </div>
                <h1 className="text-7xl font-black tracking-tighter mb-2">
                  {recipient_blood_group}
                </h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-8">
                  Required Group
                </p>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-left">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">
                      Patient Name
                    </p>
                    <p className="text-lg font-bold truncate">
                      {recipient_name}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-left">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">
                      Requester
                    </p>
                    <p className="text-lg font-bold truncate">{user_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-red-600 rounded-full"></span>
                Emergency Logistics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Hospital Section */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <FaHospital size={20} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Medical Facility
                    </label>
                    <p className="text-slate-700 font-bold text-lg leading-tight">
                      {hospital_name}
                    </p>
                  </div>
                </div>

                {/* Location Section */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Location
                    </label>
                    <p className="text-slate-700 font-bold text-lg leading-tight">
                      {recipient_upazila}, {recipient_district}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {recipient_full_address}
                    </p>
                  </div>
                </div>

                {/* Schedule Section */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <FaCalendarAlt size={20} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Donation Date
                    </label>
                    <p className="text-slate-700 font-bold text-lg leading-tight">
                      {donation_date}
                    </p>
                    <div className="flex items-center gap-2 text-red-600 font-black text-xs mt-1">
                      <FaClock size={12} /> {donation_time}
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Contact Point
                    </label>
                    <p className="text-slate-700 font-bold text-lg leading-tight break-all">
                      {user_email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Block */}
              <div className="mt-12">
                <div className="bg-slate-50 rounded-3xl p-6 border-l-4 border-red-600">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCommentDots className="text-red-600" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      Patient Message
                    </span>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed text-lg">
                    "
                    {request_message ||
                      "Urgent assistance required for this patient."}
                    "
                  </p>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-linear-to-r from-red-600 to-red-700 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-200">
              <div>
                <h3 className="text-xl font-black">Ready to Save a Life?</h3>
                <p className="text-red-100 text-sm">
                  Review the details carefully before committing to this
                  request.
                </p>
              </div>
              <Link
                to={"/donate-blood"}
                className="btn bg-white border-none text-red-600 hover:bg-slate-100 font-black px-8 rounded-2xl"
              >
                I WANT TO DONATE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsDonarReqData;
