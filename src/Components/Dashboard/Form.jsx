import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  FaUserCircle,
  FaEdit,
  FaMapMarkerAlt,
  FaTint,
  FaMailBulk,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { FaUser, FaChevronDown } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Form = ({ userData, districts, upazilas, refetch }) => {
  const [editProfile, setEditProfile] = useState(true);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const districtsOnly = districts.map((data) => data.name);
  const watchChangingDistrict = useWatch({ name: "district", control });

  const upazilasByDistrict = (data) => {
    const districtData = districts.find((d) => d.name === data);
    const selected_District_Id = districtData?.id;
    const districtWiseUpazilasData = upazilas.filter(
      (u) => u.district_id === selected_District_Id
    );
    return districtWiseUpazilasData.map((data) => data.name);
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleUpdateData = async (data) => {
    try {
      const res = await axiosSecure.patch(`/users/${userData?._id}`, data);
      if (res?.data?.modifiedCount > 0) {
        toast.success("Identity Registry Updated");
        refetch();
        setEditProfile(true);
      } else {
        setEditProfile(true);
      }
    } catch (err) {
      toast.error("Protocol Breach: Update Failed");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* --- HEADER CONTROL BAR --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 gap-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="p-3 bg-slate-950 dark:bg-red-600 rounded-2xl text-white shadow-xl hidden xs:block">
            <FaUserCircle className="text-xl sm:text-2xl" />
          </div>
          <div className="text-center sm:text-left w-full sm:w-auto">
            <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">
              Identity <span className="text-red-600 italic">Registry</span>
            </h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Security Level: Clearance Lvl 4
            </p>
          </div>
        </div>

        {editProfile && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setEditProfile(false)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all"
          >
            <FaEdit className="text-sm" /> Edit Profile
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {editProfile ? (
          /* --- VIEW MODE: READ-ONLY TERMINAL --- */
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 sm:p-10 lg:p-12 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: "District Location", value: userData?.district, icon: <FaMapMarkerAlt />, color: "text-red-500" },
                { label: "Upazila Zone", value: userData?.upazila, icon: <FaMapMarkerAlt />, color: "text-red-500" },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all hover:border-red-200 dark:hover:border-red-900/50">
                  <label className="flex items-center text-[9px] font-black text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-[0.2em]">
                    <span className={`${item.color} mr-2`}>{item.icon}</span>
                    {item.label}
                  </label>
                  <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">
                    {item.value || "Not Assigned"}
                  </p>
                </div>
              ))}

              {/* Blood Group Large Card */}
              <div className="sm:col-span-2 bg-slate-950 dark:bg-slate-900 p-8 rounded-[2.5rem] relative overflow-hidden group border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                  <FaTint size={80} />
                </div>
                <div className="relative z-10">
                  <label className="flex items-center text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.3em]">
                    <FaTint className="mr-2 text-red-600" />
                    Biometric Blood Type
                  </label>
                  <p className="text-5xl sm:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                    {userData?.blood_group || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- EDIT MODE: INPUT TERMINAL --- */
          <motion.div
            key="edit"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            className="p-6 sm:p-10 lg:p-12"
          >
            <form className="space-y-8 max-w-3xl mx-auto" onSubmit={handleSubmit(handleUpdateData)}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {/* Name Input */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 ml-2">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      defaultValue={userData?.name}
                      {...register("name", { required: "Name is required" })}
                      className="w-full bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4.5 pl-14 pr-6 font-bold text-slate-900 dark:text-white focus:border-red-500 focus:ring-0 transition-all outline-none"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-[10px] font-bold mt-2 ml-2 uppercase">{errors.name.message}</p>}
                </div>

                {/* Email Read-only */}
                <div className="sm:col-span-2 opacity-50">
                  <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 ml-2 italic">System Email (Locked)</label>
                  <div className="relative">
                    <FaMailBulk className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      defaultValue={userData?.email}
                      readOnly
                      className="w-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl py-4.5 pl-14 pr-6 font-bold text-slate-500 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                {/* District Select */}
                <div className="relative group">
                  <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 ml-2">District</label>
                  <div className="relative">
                    <select
                      defaultValue={userData?.district}
                      {...register("district", { required: "Select district" })}
                      className="w-full bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4.5 px-6 font-bold text-slate-900 dark:text-white focus:border-red-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option disabled value={userData?.district}>{userData?.district}</option>
                      {districtsOnly.map((d, i) => <option key={i} value={d}>{d}</option>)}
                    </select>
                    <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-red-500 transition-colors" />
                  </div>
                </div>

                {/* Upazila Select */}
                <div className="relative group">
                  <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 ml-2">Upazila</label>
                  <div className="relative">
                    <select
                      {...register("upazila", { required: "Select upazila" })}
                      className="w-full bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4.5 px-6 font-bold text-slate-900 dark:text-white focus:border-red-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option disabled value={userData?.upazila}>{userData?.upazila}</option>
                      {upazilasByDistrict(watchChangingDistrict).map((u, i) => <option key={i} value={u}>{u}</option>)}
                    </select>
                    <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-red-500 transition-colors" />
                  </div>
                </div>

                {/* Blood Group Select */}
                <div className="sm:col-span-2 relative group">
                  <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 ml-2">Blood Group</label>
                  <div className="relative">
                    <select
                      defaultValue={userData?.blood_group}
                      {...register("blood_group", { required: "Select blood group" })}
                      className="w-full bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4.5 px-6 font-bold text-slate-900 dark:text-white focus:border-red-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value={userData?.blood_group} disabled>{userData?.blood_group}</option>
                      {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                    <FaTint className="absolute right-5 top-1/2 -translate-y-1/2 text-red-600/50 pointer-events-none group-hover:text-red-600 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row gap-4 pt-4 sm:pt-8">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  type="submit"
                  className="flex-[2] bg-slate-950 dark:bg-red-600 text-white py-4.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:bg-red-600 dark:hover:bg-red-700 transition-all flex items-center justify-center gap-3 order-1 xs:order-2"
                >
                  <FaSave /> Commit Update
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  type="button"
                  onClick={() => setEditProfile(true)}
                  className="flex-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-400 py-4.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 order-2 xs:order-1"
                >
                  <FaTimes /> Abort
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Form;




// import { useState } from "react";
// import { useForm, useWatch } from "react-hook-form";
// import {
//   FaUserCircle,
//   FaEdit,
//   FaMapMarkerAlt,
//   FaTint,
//   FaMailBulk,
// } from "react-icons/fa";
// import { FaUser } from "react-icons/fa6";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

// const Form = ({ userData, districts, upazilas, refetch }) => {
//   const [editProfile, setEditProfile] = useState(true);
//   const axiosSecure = useAxiosSecure();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//   } = useForm();

//   // ............................................
//   const districtsOnly = districts.map((data) => data.name);

//   const watchChangingDistrict = useWatch({ name: "district", control });

//   // function that return all upazilas districts wise
//   const upazilasByDistrict = (data) => {
//     const districtData = districts.find((d) => d.name === data);

//     const selected_District_Id = districtData?.id;
//     const districtWiseUpazilasData = upazilas.filter(
//       (u) => u.district_id === selected_District_Id
//     );
//     const upazilasName = districtWiseUpazilasData.map((data) => data.name);
//     return upazilasName;
//   };
//   // ............................................
//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   const handleUpdateData = async (data) => {
//     setEditProfile(true);

//     try {
//       const res = await axiosSecure.patch(`/users/${userData?._id}`, data);

//       if (res?.data?.modifiedCount > 0) {
//         toast.success("Profile updated successfully!");
//         refetch();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleEditProfile = () => {
//     setEditProfile(!editProfile);
//   };
//   return (
//     <div>
//       <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-10 gap-6  border-b ">
//         <div className="md:flex items-center gap-4">
//           <FaUserCircle className="text-5xl text-blue-600" />
//           <h2 className="md:text-3xl font-extrabold text-gray-900 tracking-tight">
//             User Profile Details
//           </h2>
//         </div>
//         <div className="flex justify-between items-center  gap-6">
//           {editProfile ? (
//             <button
//               onClick={handleEditProfile}
//               className={`flex items-center gap-2 px-4 py-1 md:px-6 md:py-2 rounded-full bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300`}
//             >
//               <FaEdit className="text-2xl md:text-lg" />
//               Edit Profile
//             </button>
//           ) : (
//             ""
//           )}
//         </div>
//       </div>
//       {editProfile ? (
//         <div className=" bg-gray-50 flex items-center justify-center p-4 sm:p-10">
//           <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-6 sm:p-12 border border-gray-100">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//               <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
//                 <label className="flex items-center text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
//                   <FaMapMarkerAlt className="mr-2 text-blue-500" />
//                   District
//                 </label>
//                 <p className="text-xl font-semibold text-gray-800">
//                   {userData?.district}
//                 </p>
//               </div>

//               <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
//                 <label className="flex items-center text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
//                   <FaMapMarkerAlt className="mr-2 text-blue-500" />
//                   Upazila
//                 </label>
//                 <p className="text-xl font-semibold text-gray-800">
//                   {userData?.upazila}
//                 </p>
//               </div>

//               <div className="md:col-span-2 bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
//                 <label className="flex items-center text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
//                   <FaTint className="mr-2 text-red-500" />
//                   Blood Group
//                 </label>
//                 <p className="text-xl font-semibold text-gray-800">
//                   {userData?.blood_group}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="bg-gray-50 flex items-center justify-center p-4">
//           <div className="w-full max-w-xl bg-white rounded-xl p-6 border border-gray-200">
//             <form
//               className="flex flex-col gap-4"
//               onSubmit={handleSubmit(handleUpdateData)}
//             >
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   <FaUser className="inline mr-1 text-blue-500" />
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   defaultValue={userData?.name}
//                   {...register("name", { required: "Name is required" })}
//                   className={`w-full border rounded px-3 py-2 ${
//                     errors.name ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.name.message}
//                   </p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   <FaMailBulk className="inline mr-1 text-blue-500" />
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   defaultValue={userData?.email}
//                   readOnly
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Enter a valid email address",
//                     },
//                   })}
//                   className={`w-full border rounded px-3 py-2 ${
//                     errors.email ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* District */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   <FaMapMarkerAlt className="inline mr-1 text-blue-500" />
//                   District
//                 </label>
//                 <select
//                   defaultValue={userData?.district}
//                   {...register("district", {
//                     required: "Select your district",
//                   })}
//                   className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
//                 >
//                   <option disabled value={userData?.district}>
//                     {userData?.district}
//                   </option>

//                   {districtsOnly.map((d, i) => (
//                     <option key={i} value={d}>
//                       {d}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.district && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.district.message}
//                   </p>
//                 )}
//               </div>

//               {/* Upazila */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   <FaMapMarkerAlt className="inline mr-1 text-blue-500" />
//                   Upazila
//                 </label>
//                 <select
//                   {...register("upazila", {
//                     required: "Select your upazila",
//                   })}
//                   className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
//                 >
//                   <option disabled value={userData?.upazila}>
//                     {userData?.upazila}
//                   </option>

//                   {upazilasByDistrict(watchChangingDistrict).map((u, i) => (
//                     <option key={i} value={u}>
//                       {u}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.upazila && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.upazila.message}
//                   </p>
//                 )}
//               </div>

//               {/* Blood Group */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-600 mb-1">
//                   <FaTint className="inline mr-1 text-red-500" />
//                   Blood Group
//                 </label>
//                 <select
//                   defaultValue={userData?.blood_group}
//                   {...register("blood_group", {
//                     required: "Select your blood group",
//                   })}
//                   className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
//                 >
//                   <option value={userData?.blood_group} disabled>
//                     {userData?.blood_group}
//                   </option>

//                   {bloodGroups.map((bg) => (
//                     <option key={bg} value={bg}>
//                       {bg}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.blood_group && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.blood_group.message}
//                   </p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div>
//                 <input
//                   type="submit"
//                   value="Save"
//                   className="btn_primary px-3 py-2 cursor-pointer"
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {/* .............. */}
//     </div>
//   );
// };

// export default Form;
