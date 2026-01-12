import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash, FaArrowLeft, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { FiLock, FiMail, FiAlertCircle } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Login = () => {
  const [eyes, setEyes] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setError("");
    setIsSubmitting(true); // Start loading

    signInUser(data?.email, data?.password)
      .then(() => {
        // No success toast shown here for seamless professional navigation
        navigate(location?.state || "/");
      })
      .catch((err) => {
        setIsSubmitting(false); // Stop loading on error
        // Professional error mapping
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
          setError("Credential Mismatch: The email or passkey provided does not match our records.");
        } else if (err.code === 'auth/user-not-found') {
          setError("Identity Not Recognized: This account does not exist in the network.");
        } else {
          setError(err.message);
        }
        toast.error("Access Denied: Please check your credentials.");
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-red-600 transition-colors ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
        >
          <FaArrowLeft /> Return to Portal
        </Link>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-600 to-red-400"></div>

          <div className="mb-10 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-red-50 text-red-600 mb-4">
               <FaShieldAlt size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-2">
              Access <span className="text-red-600 italic font-black">Portal</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              {isSubmitting ? "Verifying Credentials..." : "Authorization Required"}
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl"
                >
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="text-red-600 mt-1 shrink-0" size={14} />
                    <div>
                      <h4 className="text-[10px] font-black text-red-700 uppercase tracking-widest">Security Alert</h4>
                      <p className="text-[11px] font-bold text-red-600/80 leading-tight mt-1">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className={`space-y-2 transition-opacity ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Network ID (Email)
              </label>
              <div className="relative group">
                <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-red-600'}`} />
                <input
                  {...register("email", { required: "Field entry required" })}
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

            {/* Password Field */}
            <div className={`space-y-2 transition-opacity ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Secure Passkey
                </label>
                <Link to="/resetPassword" className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-500' : 'text-slate-400 group-focus-within:text-red-600'}`} />
                <input
                  {...register("password", { required: "Field entry required" })}
                  type={eyes ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border-2 ${
                    errors.password ? "border-red-200 bg-red-50/30" : "border-transparent focus:border-red-600 focus:bg-white"
                  } rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner`}
                />
                <button
                  type="button"
                  onClick={() => setEyes(!eyes)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors"
                >
                  {eyes ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-950 hover:bg-red-600 disabled:bg-slate-400 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Initializing Session...
                </>
              ) : (
                "Initialize Session"
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
              New to the Network?{" "}
              <Link to="/register" className="text-red-600 hover:text-slate-950 transition-colors" state={location?.state}>
                Create Account
              </Link>
            </h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
