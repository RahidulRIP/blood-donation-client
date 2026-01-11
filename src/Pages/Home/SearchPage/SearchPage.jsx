import { useForm, useWatch } from "react-hook-form";
import Container from "../../../Components/Container/Container";
import useLoadDistricts from "../../../hooks/useLoadDistricts";
import useLoadUpazilas from "../../../hooks/useLoadUpazilas";
import {
  FaSearch,
  FaTint,
  FaMapMarkerAlt,
  FaGlobe,
  FaChevronDown,
  FaCrosshairs,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonorCard from "./DonorCard/DonorCard";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Shared/Loader";
import { motion, AnimatePresence } from "framer-motion";

const SearchPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [machDonor, setMachDonor] = useState([]);
  const [searched, setSearched] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: usersData = [], isLoading } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res?.data;
    },
  });

  const donorUsers = usersData.filter((userData) => userData.role === "donor");
  const districts = useLoadDistricts();
  const upazilas = useLoadUpazilas();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm();
  const districtsOnly = districts.map((data) => data.name);
  const watchChangingDistrict = useWatch({ name: "district", control });

  const upazilasByDistrict = (districtName) => {
    const districtData = districts.find((d) => d.name === districtName);
    return upazilas
      .filter((u) => u.district_id === districtData?.id)
      .map((data) => data.name);
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleDonorSearch = (data) => {
    const filteredUsers = donorUsers.filter(
      (donor) =>
        donor?.blood_group === data?.blood_group &&
        donor?.district === data?.district &&
        donor?.upazila === data?.upazila
    );
    setMachDonor(filteredUsers);
    setSearched(true);
  };

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-base-200 overflow-x-hidden p-2.5">
      <Container>
        <div className="py-12 md:py-20">
          {/* --- HERO SECTION WITH ANIMATION --- */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="relative mb-20 text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Live Donor Network v2.0
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black  tracking-tighter uppercase"
            >
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-900 italic">
                Match
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-slate-500 mt-6 max-w-2xl mx-auto font-medium text-lg px-4"
            >
              Access the national emergency donor registry. Zero latency,
              verified leads, instant connection.
            </motion.p>
          </motion.div>

          {/* --- THE HUD SEARCH CONSOLE --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto relative group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-linear-to-r from-red-600/20 to-slate-900/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white p-3 md:p-5 overflow-hidden">
              <div className="bg-slate-950 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                {/* Visual Data Texture */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />

                <form
                  onSubmit={handleSubmit(handleDonorSearch)}
                  className="relative z-10"
                >
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                  >
                    {/* Selector 1 */}
                    <motion.div variants={fadeInUp} className="group/field">
                      <label className="text-red-500 font-black text-[9px] uppercase tracking-[0.3em] mb-4 block ml-1">
                        01. Selection Type
                      </label>
                      <div className="relative">
                        <FaTint className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover/field:text-red-600 transition-colors duration-500" />
                        <select
                          {...register("blood_group", { required: true })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:bg-white/10 focus:border-red-600 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="text-slate-900">
                            Blood Group
                          </option>
                          {bloodGroups.map((bg) => (
                            <option
                              key={bg}
                              value={bg}
                              className="text-slate-900"
                            >
                              {bg}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                      </div>
                    </motion.div>

                    {/* Selector 2 */}
                    <motion.div variants={fadeInUp} className="group/field">
                      <label className="text-red-500 font-black text-[9px] uppercase tracking-[0.3em] mb-4 block ml-1">
                        02. Region Hub
                      </label>
                      <div className="relative">
                        <FaGlobe className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover/field:text-red-600 transition-colors duration-500" />
                        <select
                          {...register("district", { required: true })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:bg-white/10 focus:border-red-600 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="text-slate-900">
                            District
                          </option>
                          {districtsOnly.map((d) => (
                            <option
                              key={d}
                              value={d}
                              className="text-slate-900"
                            >
                              {d}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                      </div>
                    </motion.div>

                    {/* Selector 3 */}
                    <motion.div variants={fadeInUp} className="group/field">
                      <label className="text-red-500 font-black text-[9px] uppercase tracking-[0.3em] mb-4 block ml-1">
                        03. Target Area
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover/field:text-red-600 transition-colors duration-500" />
                        <select
                          {...register("upazila", { required: true })}
                          disabled={!watchChangingDistrict}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:bg-white/10 focus:border-red-600 transition-all appearance-none cursor-pointer disabled:opacity-20"
                        >
                          <option value="" className="text-slate-900">
                            Upazila
                          </option>
                          {upazilasByDistrict(watchChangingDistrict).map(
                            (u) => (
                              <option
                                key={u}
                                value={u}
                                className="text-slate-900"
                              >
                                {u}
                              </option>
                            )
                          )}
                        </select>
                        <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-10"
                  >
                    <div className="flex gap-8">
                      <div className="text-left">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                          Available Nodes
                        </p>
                        <p className="text-xl font-black text-white">
                          {donorUsers.length}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                          System Status
                        </p>
                        <p className="text-xl font-black text-emerald-500 uppercase italic">
                          Online
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="group relative inline-flex items-center gap-4 bg-red-600 text-white font-black uppercase tracking-[0.3em] px-14 py-6 rounded-2xl hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(220,38,38,0.5)] text-[11px]"
                    >
                      <FaCrosshairs className="group-hover:rotate-90 transition-transform duration-700" />
                      Launch Search
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* --- SEARCH RESULTS WITH ANIMATED TRANSITION --- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={machDonor.length}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="mt-24"
            >
              <DonorCard machDonor={machDonor} searched={searched} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;

// import { useForm, useWatch } from "react-hook-form";
// import Container from "../../../Components/Container/Container";
// import useLoadDistricts from "../../../hooks/useLoadDistricts";
// import useLoadUpazilas from "../../../hooks/useLoadUpazilas";
// import { FaSearch, FaTint } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import DonorCard from "./DonorCard/DonorCard";
// import { useEffect, useState } from "react";
// import Loader from "../../../Components/Shared/Loader";

// const SearchPage = () => {
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   const [machDonor, setMachDonor] = useState([]);
//   const [searched, setSearched] = useState(false);
//   const axiosSecure = useAxiosSecure();
//   // total users
//   const { data: usersData = [], isLoading } = useQuery({
//     queryKey: ["usersData"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users`);
//       return res?.data;
//     },
//   });

//   const donorUsers = usersData.filter((userData) => userData.role === "donor");

//   const districts = useLoadDistricts();
//   const upazilas = useLoadUpazilas();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//   } = useForm();

//   const districtsOnly = districts.map((data) => data.name);

//   const watchChangingDistrict = useWatch({ name: "district", control });

//   const upazilasByDistrict = (districtName) => {
//     const districtData = districts.find((d) => d.name === districtName);
//     const selected_District_Id = districtData?.id;
//     const districtWiseUpazilasData = upazilas.filter(
//       (u) => u.district_id === selected_District_Id
//     );
//     return districtWiseUpazilasData.map((data) => data.name);
//   };

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   const handleDonorSearch = (data) => {
//     // console.log(data);

//     const filteredUsers = donorUsers.filter(
//       (donorUser) =>
//         donorUser?.blood_group === data?.blood_group &&
//         donorUser?.district === data?.district &&
//         donorUser?.upazila === data?.upazila
//     );
//     setMachDonor(filteredUsers);
//     setSearched(true);
//   };
//   if (isLoading) {
//     return <Loader />;
//   }
//   return (
//     <Container>
//       <div className="flex items-center justify-center my-12 md:my-16 p-3.5">
//         <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-2xl border-t-4 border-red-600">
//           <h2 className="text-3xl font-extrabold text-center text-gray-800 flex items-center justify-center gap-2">
//             <FaSearch className="text-red-600" /> Find Donor
//           </h2>
//           <p className="text-center text-gray-600">
//             Select the criteria below to quickly locate a nearby blood donor.
//           </p>

//           <form
//             onSubmit={handleSubmit(handleDonorSearch)}
//             className="space-y-6"
//           >
//             <section className="space-y-6">
//               {/* Blood Group Selection */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Required Blood Group
//                 </label>
//                 <div className="relative">
//                   <select
//                     defaultValue=""
//                     // Registering this field for submission
//                     {...register("blood_group", {
//                       required: "Please select a blood group",
//                     })}
//                     className="select select-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   >
//                     <option value="" disabled>
//                       Select blood group
//                     </option>
//                     {bloodGroups.map((bg) => (
//                       <option key={bg} value={bg}>
//                         {bg}
//                       </option>
//                     ))}
//                   </select>
//                   <FaTint className="absolute top-3.5 left-3 z-1 text-red-600" />
//                 </div>
//                 {errors.blood_group && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.blood_group.message}
//                   </p>
//                 )}
//               </div>

//               {/* District */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   District
//                 </label>
//                 <div className="relative">
//                   <select
//                     defaultValue=""
//                     {...register("district", {
//                       required: "Please select a district",
//                     })}
//                     className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                   >
//                     <option value="" disabled>
//                       Select district
//                     </option>
//                     {districtsOnly.map((d, i) => (
//                       <option key={i} value={d}>
//                         {d}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.district && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.district.message}
//                   </p>
//                 )}
//               </div>

//               {/* Upazila */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Upazila
//                 </label>
//                 <div className="relative">
//                   <select
//                     defaultValue=""
//                     {...register("upazila", {
//                       required: "Please select an upazila",
//                     })}
//                     className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500"
//                     // Conditional disable based on district selection
//                     disabled={!watchChangingDistrict}
//                   >
//                     <option value="" disabled>
//                       Select upazila
//                     </option>

//                     {/* Options generated by the preserved logic: upazilasByDistrict */}
//                     {upazilasByDistrict(watchChangingDistrict).map((u, i) => (
//                       <option key={i} value={u}>
//                         {u}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.upazila && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.upazila.message}
//                   </p>
//                 )}
//               </div>
//             </section>

//             {/* Search Button */}
//             <button
//               type="submit"
//               className="w-full bg-primary hover:text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-8"
//             >
//               <FaSearch /> Search Donors
//             </button>
//           </form>
//         </div>
//       </div>
//       <div>
//         <DonorCard machDonor={machDonor} searched={searched} />
//       </div>
//     </Container>
//   );
// };

// export default SearchPage;
