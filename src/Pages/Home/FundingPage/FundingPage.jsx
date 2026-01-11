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
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter">
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
                        <FaHistory size={48} className="mb-4" />
                        <p className="font-black uppercase tracking-[0.3em] text-xs">
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
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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

// import { useState } from "react";
// import { useForm } from "react-hook-form"; // For the funding form modal
// import { FaPlus, FaCalendarAlt, FaUser, FaDollarSign } from "react-icons/fa"; // React Icons
// import { FcDonate } from "react-icons/fc";
// import useAuth from "../../../hooks/useAuth";
// import Loader from "../../../Components/Shared/Loader";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { useQuery } from "@tanstack/react-query";
// import Container from "../../../Components/Container/Container";

// const FundingPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: fundingData = [] } = useQuery({
//     queryKey: ["fundingData", user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(
//         `/donation-funds-data?email=${user?.email}`
//       );
//       return data;
//     },
//   });

//   // handling form data
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const handleFundSubmit = async (data) => {
//     Swal.fire({
//       title: "Please confirm if you'd like to proceed!",
//       text: "Your Contribution Creates Hope!",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Confirm!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setIsModalOpen(false);
//         reset();
//         // stripe start here
//         const paymentInfo = {
//           donation_amount: data?.amount,
//           name: data?.name,
//           donor_email: user?.email,
//         };
//         // console.log(paymentInfo);
//         try {
//           axiosSecure
//             .post("/create-checkout-session", paymentInfo)
//             .then((res) => {
//               window.open(res.data.url, "_blank");
//             });
//         } catch (error) {
//           console.log(error);
//         }
//         // stripe end here
//       }
//     });
//   };

//   return (
//     <Container>
//       <div className=" p-4 sm:p-6">
//         <h2 className="text-3xl font-bold text-center mb-8 text-primary">
//           Organization Funding Tracker
//         </h2>
//         <div className="flex justify-end mb-6">
//           <button
//             className="btn btn-primary text-black btn-lg shadow-lg"
//             // opening modal from here by calling
//             onClick={() => setIsModalOpen(true)}
//           >
//             <FaPlus size={20} className="mr-2 text-red-400 " />
//             Give Fund <FcDonate size={24} className="mr-2 text-red-400 " />
//           </button>
//         </div>

//         {/*Table*/}
//         <div className="bg-white shadow-xl rounded-2xl overflow-x-auto md:max-w-6xl mx-auto ">
//           <table className="table w-full">
//             <thead className="bg-base-200">
//               <tr>
//                 <th>
//                   <FaUser className="inline mr-1" /> Donor Name
//                 </th>
//                 <th>
//                   <FaUser className="inline mr-1" /> Donor Email
//                 </th>

//                 <th>
//                   <FaDollarSign className="inline mr-1" /> Fund Amount
//                 </th>
//                 <th>
//                   <FaDollarSign className="inline mr-1" /> Transaction ID
//                 </th>
//                 <th>
//                   <FaCalendarAlt className="inline mr-1" /> Funding Date
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {fundingData.map((data) => (
//                 <tr key={data?._id} className="hover:bg-base-100">
//                   <td className="font-medium text-gray-700">{data?.name}</td>
//                   <td className="font-medium text-gray-700">
//                     {data?.user_email}
//                   </td>
//                   <td>
//                     <span className="badge badge-success badge-lg font-bold">
//                       {data?.amount / 100} $
//                     </span>
//                   </td>
//                   <td className="font-medium text-gray-700">
//                     <span className="text-red-300">{data?.transactionId}</span>
//                   </td>
//                   <td className="text-sm text-gray-500">{data?.donate_date}</td>
//                 </tr>
//               ))}

//               {fundingData.length ? (
//                 ""
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="3"
//                     className="text-center py-8 text-lg text-gray-500"
//                   >
//                     "No funds recorded yet. Be the first!"
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Modal: DaisyUI Modal  */}
//         {isModalOpen && (
//           <div className="modal modal-open">
//             <div className="modal-box">
//               <h3 className="font-bold text-2xl text-primary mb-4">
//                 Make a Donation
//               </h3>
//               <p className="text-sm text-gray-500 mb-6">
//                 Your generosity helps us save lives. Payments are processed
//                 securely via Stripe.
//               </p>

//               <form onSubmit={handleSubmit(handleFundSubmit)}>
//                 {/* Amount Input */}
//                 <div className="form-control w-full mb-4">
//                   <label className="label">
//                     <span className="label-text font-semibold">
//                       Donation Amount ($)
//                     </span>
//                   </label>
//                   <input
//                     type="number"
//                     step="0.001"
//                     placeholder="e.g., 50.00"
//                     className={`input input-bordered w-full ${
//                       errors.amount ? "input-error" : ""
//                     }`}
//                     {...register("amount", {
//                       required: "Amount is required",
//                       min: { value: 5, message: "Minimum donation is $5" },
//                     })}
//                   />
//                   {errors.amount && (
//                     <label className="label">
//                       <span className="label-text-alt text-error">
//                         {errors.amount.message}
//                       </span>
//                     </label>
//                   )}
//                 </div>

//                 <div className="form-control w-full mb-6">
//                   <label className="label">
//                     <span className="label-text font-semibold">Your Name</span>
//                   </label>
//                   <input
//                     type="text"
//                     defaultValue={user?.displayName}
//                     placeholder="Anonymous"
//                     className="input input-bordered w-full"
//                     {...register("name")}
//                     readOnly
//                   />
//                 </div>

//                 <div className="modal-action mt-8">
//                   <button type="submit" className="btn btn-primary text-black">
//                     Donate Now
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-ghost"
//                     onClick={() => setIsModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//             <div
//               className="modal-backdrop"
//               onClick={() => setIsModalOpen(false)}
//             ></div>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default FundingPage;
