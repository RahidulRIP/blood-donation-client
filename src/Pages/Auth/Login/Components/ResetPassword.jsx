import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { FiMail, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";

const ResetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReset = (data) => {
    setIsSubmitting(true);
    resetPassword(data?.email)
      .then(() => {
        setIsSubmitting(false);
        setIsSent(true);
        toast.success("Recovery link dispatched to your inbox.");
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast.error("Protocol Error: " + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-red-600 transition-colors"
        >
          <FaArrowLeft /> Back to Login
        </Link>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-600 to-red-400"></div>

          <div className="mb-10 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-red-50 text-red-600 mb-4">
               <FaShieldAlt size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-2">
              Recovery <span className="text-red-600 italic font-black">Portal</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              {isSent ? "Protocol Dispatched" : "Identity Verification"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(handleReset)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Registered Email Address
                  </label>
                  <div className="relative group">
                    <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-red-600'}`} />
                    <input
                      {...register("email", { required: "Required for recovery" })}
                      type="email"
                      placeholder="name@agency.com"
                      className={`w-full bg-slate-50 border-2 ${
                        errors.email ? "border-red-200 bg-red-50/30" : "border-transparent focus:border-red-600 focus:bg-white"
                      } rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner`}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1.5 text-red-600 ml-1">
                      <FiAlertCircle size={12} />
                      <span className="text-[10px] font-black uppercase tracking-tight">{errors.email.message}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-950 hover:bg-red-600 disabled:bg-slate-400 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Dispatching Link...
                    </>
                  ) : (
                    "Send Recovery Link"
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="flex justify-center mb-4 text-green-500">
                    <FaCheckCircle size={48} />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">Check Your Inbox</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                  If an account exists for that email, you will receive a link shortly to reset your passkey.
                </p>
                <Link
                  to="/login"
                  className="w-full inline-block bg-slate-100 hover:bg-slate-200 text-slate-900 font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition-all"
                >
                  Return to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;