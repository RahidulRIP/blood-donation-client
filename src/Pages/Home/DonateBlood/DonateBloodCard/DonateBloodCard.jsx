import {
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTint,
  FaCommentDots,
  FaFingerprint,
  FaBiohazard,
  FaCheckCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast, Slide } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../../../Components/Shared/Loader";

const DonateBloodCard = ({ detailsData, refetch, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
    _id,
  } = detailsData;

  const handleChangeStatus = async (id) => {
    setIsModalOpen(false);
    
    // Technical staged toast
    const toastId = toast.loading("SYNCHRONIZING WITH BLOOD NETWORK...", {
      position: "top-center",
      theme: "dark",
    });

    const bloodDonorInfo = {
      bloodDonorName: user?.displayName,
      bloodDonorEmail: user?.email,
    };

    try {
      const res = await axiosSecure.patch(
        `/update-donation-status/${id}`,
        bloodDonorInfo
      );
      if (res.data.modifiedCount > 0) {
        await refetch();
        toast.update(toastId, {
          render: (
            <div className="flex flex-col">
              <span className="font-black tracking-widest text-[10px] text-emerald-400">ACCESS GRANTED</span>
              <span className="text-xs font-bold text-white">DONATION PROTOCOL ACTIVATED</span>
            </div>
          ),
          type: "success",
          isLoading: false,
          autoClose: 4000,
          icon: <FaCheckCircle className="text-emerald-400" />,
          transition: Slide,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: `SYSTEM OVERRIDE FAILED: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      {/* OUTER GLOW EFFECT */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-red-600 to-slate-900 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

      <div className="relative bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl flex flex-col xl:flex-row">
        
        {/* LEFT: THE "BIO-STAMP" PANEL */}
        <div className="bg-slate-950 p-10 flex flex-col items-center justify-center min-w-60 relative">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative">
            <FaTint
              className={`text-6xl ${
                donation_status === "pending"
                  ? "text-red-600 animate-pulse"
                  : "text-slate-800"
              }`}
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full border-4 border-slate-950 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </div>

          <h2 className="text-6xl font-black text-white mt-4 tracking-tighter">
            {recipient_blood_group}
          </h2>
          <div className="mt-4 px-4 py-1 bg-red-600/10 border border-red-600/20 rounded-full">
            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">
              Critical Need
            </p>
          </div>

          <div className="mt-8 w-full space-y-2">
            <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest">
              <span>Status</span>
              <span className={donation_status === "pending" ? "text-emerald-500" : "text-red-500"}>
                {donation_status}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: donation_status === "pending" ? "40%" : "100%" }}
                className="h-full bg-red-600"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: THE "HUD" CONTENT */}
        <div className="flex-1 p-10 bg-linear-to-br from-white to-slate-50 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaFingerprint className="text-red-600 text-xs" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Patient Record ID: {_id.slice(-8)}
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                {recipient_name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Authorized By
              </p>
              <p className="text-xs font-bold text-slate-700">{user_name}</p>
            </div>
          </div>

          {/* TECH-GRID INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-slate-100 py-8">
            <div className="space-y-6">
              {/* FACILITY */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center border border-slate-50 shrink-0">
                  <FaHospital className="text-red-600" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Medical Facility
                  </p>
                  <p className="text-xs font-bold text-slate-800">{hospital_name}</p>
                </div>
              </div>

              {/* LOCATION - USING RECIPIENT_FULL_ADDRESS */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center border border-slate-50 shrink-0">
                  <FaMapMarkerAlt className="text-red-600" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Precise Coordinate
                  </p>
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {recipient_full_address}
                  </p>
                  <p className="text-[9px] font-medium text-slate-500 mt-1 uppercase tracking-tighter">
                    {recipient_upazila}, {recipient_district}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center border border-slate-50 shrink-0">
                  <FaCalendarAlt className="text-red-600" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Deployment Date
                  </p>
                  <p className="text-xs font-bold text-slate-800">{donation_date}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center border border-slate-50 shrink-0">
                  <FaClock className="text-red-600" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Time Window
                  </p>
                  <p className="text-xs font-bold text-slate-800">{donation_time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGE AREA */}
          <div className="mt-8 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <FaCommentDots className="text-red-600 text-xs" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Encrypted Note
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium italic leading-relaxed bg-slate-100/50 p-4 rounded-2xl border border-slate-100">
              "{request_message}"
            </p>
          </div>

          {/* ACTION BUTTON */}
          <div className="mt-10">
            <button
              onClick={() => {
                if (user?.email === user_email)
                  toast.error("Self-action blocked.");
                else setIsModalOpen(true);
              }}
              disabled={donation_status !== "pending"}
              className={`w-full group relative overflow-hidden rounded-2xl py-5 font-black text-[10px] uppercase tracking-[0.4em] transition-all duration-500 shadow-xl
                ${
                  donation_status === "pending"
                    ? "bg-slate-950 text-white hover:bg-red-600 shadow-red-200"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <FaBiohazard
                  className={donation_status === "pending" ? "animate-spin" : ""}
                  style={{ animationDuration: '3s' }}
                />
                {donation_status === "pending" ? "Authorize Donation" : "Link Inactive"}
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: GLASS TERMINAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-1000 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl border border-white"
            >
              <div className="bg-slate-950 p-10 text-center">
                <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-600/20">
                  <FaTint className="text-red-600 text-3xl animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  Confirm Identity
                </h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">
                  Biometric Verification Required
                </p>
              </div>

              <div className="p-10 space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Donor Node
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {user?.displayName}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleChangeStatus(_id)}
                    className="py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-slate-950 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DonateBloodCard;
