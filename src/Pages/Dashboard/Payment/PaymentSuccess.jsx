import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiHome, FiCreditCard, FiCheckCircle, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";
import Container from "../../../Components/Container/Container";

const PaymentSuccess = () => {
  const [paymentInformation, setPaymentInformation] = useState();
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const called = useRef(false);

  const session_id = searchParams.get("session_id");

  useEffect(() => {
    if (!session_id || called.current) return;
    called.current = true;

    if (session_id) {
      axiosSecure
        .post(`/payment-success/?session_id=${session_id}`)
        .then((res) => {
          if (res?.data?.transactionId) {
            setPaymentInformation(res?.data?.transactionId);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment successful!",
              showConfirmButton: false,
              timer: 2500,
              background: "#ffffff",
              color: "#0f172a",
              iconColor: "#dc2626",
            });
          }
        });
    }
  }, [session_id, axiosSecure]);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-6 font-sans">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden text-center">
            {/* Red Accent Header */}
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-600 to-red-400"></div>

            {/* Success Iconry */}
            <div className="relative inline-flex mb-8">
              <div className="p-6 rounded-full bg-red-50 text-red-600 relative z-10">
                <FiCheckCircle size={48} strokeWidth={1.5} />
              </div>
              <div className="absolute -top-2 -right-2 p-2 rounded-full bg-slate-950 text-white z-20 shadow-lg">
                <FiShield size={16} />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-4">
              Transaction <span className="text-red-600 italic">Confirmed</span>
            </h2>
            
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
              Network Funding Protocol Complete
            </p>

            {/* Transaction ID Card */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 mb-10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Official Transaction Hash
              </span>
              <span className="text-lg font-mono font-bold text-slate-900 break-all select-all">
                {paymentInformation || "PROCESSING_HASH..."}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/">
                <button className="w-full flex items-center justify-center gap-3 bg-slate-950 hover:bg-red-600 text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-lg active:scale-95 text-[11px]">
                  <FiHome size={16} />
                  Return Home
                </button>
              </Link>

              <Link to="/funding-page">
                <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 hover:border-red-600 hover:text-red-600 text-slate-500 font-black uppercase tracking-[0.2em] py-4 rounded-xl transition-all active:scale-95 text-[11px]">
                  <FiCreditCard size={16} />
                  Funding Log
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default PaymentSuccess;
