import { FiXCircle, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";
import Container from "../../../Components/Container/Container";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-20 px-6 font-sans">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden text-center">
            {/* Red Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-600 to-red-400"></div>

            {/* Error Iconry */}
            <div className="relative inline-flex mb-8">
              <div className="p-6 rounded-full bg-red-50 text-red-600 relative z-10">
                <FiXCircle size={48} strokeWidth={1.5} />
              </div>
              <div className="absolute -top-1 -right-1 p-2 rounded-full bg-slate-950 text-white z-20 shadow-lg">
                <FiAlertTriangle size={14} />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-4">
              Session <span className="text-red-600 italic">Aborted</span>
            </h2>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
              Protocol Interrupted • No Charges Applied
            </p>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-10">
              <p className="text-sm text-slate-500 font-bold leading-relaxed">
                The payment process was terminated by the user or timed out by
                the network gateway.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => window.history.back()}
                className="w-full flex items-center justify-center gap-3 bg-slate-950 hover:bg-red-600 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-[0.98] text-[11px]"
              >
                <FiArrowLeft size={16} />
                Return to Previous
              </button>

              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest pt-2">
                System Status: Standing By
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default PaymentCancelled;
