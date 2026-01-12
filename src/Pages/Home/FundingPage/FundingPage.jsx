import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaPlus,
  FaCalendarAlt,
  FaUser,
  FaDollarSign,
  FaShieldAlt,
  FaHistory,
} from "react-icons/fa";
import { FcDonate } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container/Container";
import Loader from "../../../Components/Shared/Loader"; // Ensure this import exists

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Added isLoading from useQuery
  const { data: fundingData = [], isLoading } = useQuery({
    queryKey: ["fundingData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-funds-data?email=${user?.email}`
      );
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFundSubmit = async (data) => {
    Swal.fire({
      title: "Confirm Contribution?",
      text: "Your support fuels our life-saving mission.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#0f172a",
      confirmButtonText: "Proceed to Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsModalOpen(false);
        reset();
        const paymentInfo = {
          donation_amount: data?.amount,
          name: data?.name,
          donor_email: user?.email,
        };
        try {
          axiosSecure
            .post("/create-checkout-session", paymentInfo)
            .then((res) => {
              window.open(res.data.url, "_blank");
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // Implement Loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 md:py-20 p-2.5"
      >
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 px-4 ">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Financial Transparency Portal
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Funding <span className="text-red-600 italic">History</span>
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-950 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-2xl hover:shadow-red-200 active:scale-95"
          >
            <FaPlus className="text-red-500 group-hover:text-white transition-colors" />
            Contribute Fund
            <FcDonate
              size={24}
              className="filter grayscale group-hover:grayscale-0 transition-all"
            />
          </button>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-slate-950 border-none">
                  <th className="py-7 pl-10 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    <FaUser className="inline mr-2 text-red-500" /> Donor
                    Identity
                  </th>
                  <th className="py-7 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    Amount (USD)
                  </th>
                  <th className="py-7 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    Transaction Hash
                  </th>
                  <th className="py-7 pr-10 text-white font-black uppercase tracking-[0.2em] text-[10px] text-right">
                    <FaCalendarAlt className="inline mr-2 text-red-500" />{" "}
                    Timestamp
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {fundingData.length > 0 ? (
                  fundingData.map((data, index) => (
                    <motion.tr
                      key={data?._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-6 pl-10">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 uppercase tracking-tight text-sm">
                            {data?.name || "Anonymous Donor"}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {data?.user_email}
                          </span>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className="inline-flex items-center px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-black text-sm border border-emerald-100">
                          <FaDollarSign className="text-[10px] mr-1" />
                          {(data?.amount / 100).toFixed(2)}
                        </div>
                      </td>
                      <td className="py-6">
                        <code className="text-[11px] font-mono bg-slate-100 px-3 py-1 rounded-md text-slate-600 border border-slate-200">
                          {data?.transactionId}
                        </code>
                      </td>
                      <td className="py-6 pr-10 text-right">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                          {data?.donate_date}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-24 text-center">
                      <div className="flex flex-col items-center opacity-20">
                        <FaHistory size={48} className="mb-4 text-gray-500" />
                        <p className="font-black uppercase text-gray-500 tracking-[0.3em] text-xs">
                          No Financial Records Found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL SECTION (Logic remains identical) */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-3xl p-8 overflow-hidden"
              >
                <div className="relative">
                  <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-2">
                    Secure <span className="text-red-600">Fund</span>
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                    <FaShieldAlt className="text-emerald-500" /> Encrypted via
                    Stripe
                  </p>

                  <form
                    onSubmit={handleSubmit(handleFundSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                        Donation Amount (USD)
                      </label>
                      <div className="relative">
                        <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className={`w-full pl-10 pr-4 py-4 bg-slate-50 border-2 rounded-2xl font-black text-slate-900 transition-all outline-none ${
                            errors.amount
                              ? "border-red-500 ring-4 ring-red-50"
                              : "border-slate-100 focus:border-red-600 focus:bg-white"
                          }`}
                          {...register("amount", {
                            required: "Amount is required",
                            min: {
                              value: 5,
                              message: "Minimum donation is $5",
                            },
                          })}
                        />
                      </div>
                      {errors.amount && (
                        <p className="text-[10px] font-black text-red-500 uppercase mt-1 ml-1">
                          {errors.amount.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                        Donor Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.displayName}
                        readOnly
                        className="w-full px-4 py-4 bg-slate-100 border-2 border-slate-100 rounded-2xl font-black text-slate-400 uppercase text-xs outline-none cursor-not-allowed"
                        {...register("name")}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-red-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-100 active:scale-95"
                      >
                        Confirm Fund
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};

export default FundingPage;