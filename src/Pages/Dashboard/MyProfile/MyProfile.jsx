import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container/Container";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Form from "../../../Components/Dashboard/Form";
import useLoadDistricts from "../../../hooks/useLoadDistricts";
import useLoadUpazilas from "../../../hooks/useLoadUpazilas";
import Loader from "../../../Components/Shared/Loader";
import { FaEnvelope, FaFingerprint, FaIdBadge, FaMicrochip, FaDatabase } from "react-icons/fa6";
import { motion } from "framer-motion";
import { MdSecurity } from "react-icons/md";

const MyProfile = () => {
  const districts = useLoadDistricts();
  const upazilas = useLoadUpazilas();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userData = {}, refetch, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res?.data[0];
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300 pb-10 sm:pb-20">
      <Container>
        <div className="pt-6 sm:pt-10">
          
          {/* --- PROFILE HUD HEADER --- */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 px-4 gap-6">
            <div className="w-full lg:w-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-slate-900 dark:bg-red-600 rounded-lg text-white shadow-lg shadow-red-500/20">
                  <FaMicrochip className="animate-pulse text-xs sm:text-sm" />
                </div>
                <span className="text-red-600 dark:text-red-500 font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[9px] sm:text-[10px]">
                  Authorized Access Only
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase  ">
                User <span className="text-red-600 italic">Profile</span>
              </h1>
            </div>

            {/* Registry ID Badge - Adaptive */}
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full lg:w-auto justify-center lg:justify-start">
               <FaDatabase className="text-slate-400 dark:text-slate-600 text-xs" />
               <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate">
                 Global Registry ID: {userData?._id?.slice(-8).toUpperCase()}
               </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 px-4 lg:px-0">
            
            {/* --- LEFT COLUMN: IDENTITY CARD --- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="bg-slate-950 dark:bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 relative overflow-hidden shadow-2xl border border-white/5">
                {/* Visual Flair / Tech Grid Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-8">
                    {/* Glowing Aura */}
                    <div className="absolute -inset-4 bg-red-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <img
                      className="w-32 h-32 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-white/10 relative z-10 shadow-2xl transition-transform hover:scale-105 duration-500"
                      src={user?.photoURL}
                      alt="Profile"
                    />
                    <div className="absolute bottom-1 right-1 sm:bottom-3 sm:right-3 bg-red-600 p-3 sm:p-4 rounded-2xl border-4 border-slate-950 dark:border-slate-900 z-20 shadow-xl">
                      <FaFingerprint className="text-white text-lg sm:text-xl" />
                    </div>
                  </div>

                  <div className="text-center space-y-3 mb-10 w-full">
                    <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight truncate px-2">
                      {userData?.name}
                    </h2>
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 text-white/60 hover:bg-white/10 transition-colors cursor-default">
                      <FaEnvelope className="text-red-500 text-[10px]" />
                      <span className="text-[11px] font-bold tracking-tight lowercase">{user?.email}</span>
                    </div>
                  </div>

                  {/* Status Grid */}
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center backdrop-blur-sm">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">Network</p>
                      <p className="text-xs font-black text-emerald-500 uppercase tracking-widest italic">Online</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center backdrop-blur-sm">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">Access</p>
                      <p className="text-xs font-black text-white uppercase tracking-widest italic">Level 4</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECURITY PROTOCOL BOX */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 flex items-center gap-5 shadow-sm transition-all hover:shadow-md">
                <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-500 shadow-inner">
                  <MdSecurity size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Security Protocol</p>
                  <p className="text-sm font-black text-slate-900 dark:text-slate-200 uppercase">End-to-End Encrypted</p>
                </div>
              </div>
            </motion.div>

            {/* --- RIGHT COLUMN: UPDATE TERMINAL --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-8 h-full"
            >
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-full">
                {/* Terminal Header */}
                <div className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 px-6 sm:px-10 py-5 sm:py-7 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3">
                    <FaIdBadge className="text-red-600 dark:text-red-500" />
                    <h3 className="text-[10px] sm:text-[11px] font-black text-slate-950 dark:text-white uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                      Registry Update Protocol
                    </h3>
                  </div>
                  <div className="hidden sm:block ml-auto">
                    <div className="flex gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
                       <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
                       <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    </div>
                  </div>
                </div>

                {/* Form Content Area */}
                <div className="p-6 sm:p-10 lg:p-14 flex-grow">
                  <div className="max-w-4xl mx-auto">
                    <Form
                      districts={districts}
                      upazilas={upazilas}
                      userData={userData}
                      refetch={refetch}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyProfile;





// import { useQuery } from "@tanstack/react-query";
// import Container from "../../../Components/Container/Container";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Form from "../../../Components/Dashboard/Form";
// import useLoadDistricts from "../../../hooks/useLoadDistricts";
// import useLoadUpazilas from "../../../hooks/useLoadUpazilas";
// import { FaEnvelope, FaUser } from "react-icons/fa6";

// const MyProfile = () => {
//   const districts = useLoadDistricts();
//   const upazilas = useLoadUpazilas();

//   const axiosSecure = useAxiosSecure();

//   const { user } = useAuth();

//   const { data: userData = {}, refetch } = useQuery({
//     queryKey: ["userData", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users?email=${user?.email}`);
//       return res?.data[0];
//     },
//     enabled: !!user?.email,
//   });
//   // console.log(userData);
//   return (
//     <div>
//       <Container>
//         {user?.email && (
//           <div className="mx-auto flex flex-col items-center  w-full mt-1.5 md:mt-6 bg-base-200 min-h-screen">
//             <div className="bg-amber-400  h-72 rounded-t-2xl relative w-full"></div>
//             <div className="flex justify-center -mt-12 z-1">
//               <img
//                 className="w-32 h-32 rounded-full object-cover"
//                 src={user?.photoURL}
//                 alt=""
//               />
//             </div>
//             <div>
//               <div className="text-center p-4">
//                 <h2 className="text-lg mb-1 text-gray-800">
//                   <span className="font-medium mr-1 text-gray-600">
//                     <FaUser className="inline w-4 h-4 mr-1 text-blue-500" />
//                     Name:
//                   </span>

//                   <span className="font-semibold">{userData?.name}</span>
//                 </h2>

//                 <h2 className="text-lg text-gray-800">
//                   <span className="font-medium mr-1 text-gray-600">
//                     <FaEnvelope className="inline w-4 h-4 mr-1 text-green-500" />
//                     Email:
//                   </span>

//                   <span className="font-semibold">{user?.email}</span>
//                 </h2>
//               </div>
//               <Form
//                 districts={districts}
//                 upazilas={upazilas}
//                 userData={userData}
//                 refetch={refetch}
//               />
//             </div>
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default MyProfile;
