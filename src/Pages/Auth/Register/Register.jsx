import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  FiImage,
  FiLock,
  FiMail,
  FiUser,
  FiMapPin,
  FiDroplet,
} from "react-icons/fi";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Container from "../../../Components/Container/Container";
import { toast } from "react-toastify";
import useLoadDistricts from "../../../hooks/useLoadDistricts";
import useLoadUpazilas from "../../../hooks/useLoadUpazilas";
import useAxios from "../../../hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const districts = useLoadDistricts();
  const upazilas = useLoadUpazilas();
  const location = useLocation();
  const { createUser, updateUserProfile } = useAuth();
  const [eyes, setEyes] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm();

  const districtsOnly = districts.map((data) => data.name);
  const watchChangingDistrict = useWatch({ name: "district", control });
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const upazilasByDistrict = (data) => {
    const districtData = districts.find((d) => d.name === data);
    const selected_District_Id = districtData?.id;
    return upazilas
      .filter((u) => u.district_id === selected_District_Id)
      .map((data) => data.name);
  };

  const handleRegister = async (data) => {
    if (data?.password !== data?.confirm_password) {
      setError("Security Sync Failed: Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true); // Start loading
      setError("");

      const file = data.photo[0];
      const formData = new FormData();
      formData.append("image", file);
      const apiKey = import.meta.env.VITE_ImgBB_api;
      const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

      const image = await axiosInstance.post(url, formData);
      const imgURL = image?.data?.data?.display_url;

      const profile = {
        displayName: data?.name,
        photoURL: imgURL,
      };

      await createUser(data?.email, data?.password);
      await updateUserProfile(profile);

      const userInfo = {
        name: data?.name,
        email: data?.email,
        photoURL: imgURL,
        blood_group: data?.blood_group,
        district: data?.district,
        upazila: data?.upazila,
      };

      await axiosInstance.post("/users", userInfo);

      // Removed toast.success here for a seamless professional transition
      navigate(location?.state || "/");
    } catch (err) {
      setIsSubmitting(false); // Reset loading on error
      setError(err.message);
      toast.error("Registration Terminated: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Link
            to="/login"
            className={`inline-flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-red-600 transition-colors ${
              isSubmitting ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <FaArrowLeft /> Back to Login
          </Link>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-600 to-red-400"></div>

            <div className="mb-12 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-red-50 text-red-600 mb-4">
                <FiUser size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-2">
                Create{" "}
                <span className="text-red-600 italic font-black">Account</span>
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                {isSubmitting
                  ? "Syncing with Network..."
                  : "Network Enrollment Form"}
              </p>
            </div>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-8">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl"
                  >
                    <div className="flex items-start gap-3">
                      <FaExclamationTriangle
                        className="text-red-600 mt-1 shrink-0"
                        size={14}
                      />
                      <div>
                        <h4 className="text-[10px] font-black text-red-700 uppercase tracking-widest">
                          Enrollment Error
                        </h4>
                        <p className="text-[11px] font-bold text-red-600/80 leading-tight mt-1">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 transition-opacity duration-500 ${
                  isSubmitting
                    ? "opacity-40 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                {/* Inputs remain same as your previous structure but with disabled state based on isSubmitting if preferred */}
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Full Legal Name
                    </label>
                    <div className="relative group">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                      <input
                        {...register("email", {
                          required: "Email is required",
                        })}
                        type="email"
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner"
                        placeholder="name@agency.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Profile Image
                    </label>
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        {...register("photo", {
                          required: "Photo is required",
                        })}
                        className="w-full file:bg-slate-950 file:text-white file:border-none file:px-4 file:py-2 file:rounded-xl file:text-[10px] file:font-black file:uppercase file:mr-4 bg-slate-50 border-2 border-transparent focus:border-red-600 rounded-2xl py-2.5 pl-4 pr-4 text-xs font-bold text-slate-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Blood Type
                    </label>
                    <div className="relative">
                      <FiDroplet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                      <select
                        {...register("blood_group", { required: "Required" })}
                        className="w-full appearance-none bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner"
                      >
                        <option value="">Select Group</option>
                        {bloodGroups.map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      District
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                      <select
                        {...register("district", { required: "Required" })}
                        className="w-full appearance-none bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner"
                      >
                        <option value="">Select District</option>
                        {districtsOnly.map((d, i) => (
                          <option key={i} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Upazila
                    </label>
                    <select
                      {...register("upazila", { required: "Required" })}
                      disabled={!watchChangingDistrict}
                      className="w-full appearance-none bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner disabled:opacity-50"
                    >
                      <option value="">Select Upazila</option>
                      {watchChangingDistrict &&
                        upazilasByDistrict(watchChangingDistrict).map(
                          (u, i) => (
                            <option key={i} value={u}>
                              {u}
                            </option>
                          )
                        )}
                    </select>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Create Passkey
                    </label>
                    <div className="relative group">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                      <input
                        {...register("password", {
                          required: "Passkey required",
                        })}
                        type={eyes ? "text" : "password"}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setEyes(!eyes)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors focus:outline-none"
                      >
                        {eyes ? (
                          <FaRegEyeSlash size={18} />
                        ) : (
                          <FaRegEye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Confirm Passkey
                    </label>
                    <div className="relative group">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                      <input
                        {...register("confirm_password", {
                          required: "Verification required",
                        })}
                        type={eyes ? "text" : "password"}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-slate-900 focus:outline-none transition-all shadow-inner"
                        placeholder="••••••••"
                      />
                      {/* We use the same 'eyes' state to toggle both for a better user experience during confirmation */}
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setEyes(!eyes)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors focus:outline-none"
                      >
                        {eyes ? (
                          <FaRegEyeSlash size={18} />
                        ) : (
                          <FaRegEye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button with built-in Loader state */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-950 hover:bg-red-600 disabled:bg-slate-400 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Initializing Profile...
                  </>
                ) : (
                  "Enroll in Network"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Register;