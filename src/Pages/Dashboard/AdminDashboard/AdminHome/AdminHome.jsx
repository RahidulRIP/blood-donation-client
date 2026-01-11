import { useQuery } from "@tanstack/react-query";
import Container from "../../../../Components/Container/Container";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { 
  FaUsers, 
  FaHandHoldingUsd, 
  FaFileAlt, 
  FaShieldAlt, 
  FaChartLine, 
  FaSatellite, 
  FaHistory 
} from "react-icons/fa";
import { FiActivity } from "react-icons/fi"; 
import { BiSolidDonateBlood } from "react-icons/bi";
import BarChart from "../../../../Components/Shared/BarChart";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';

const AdminHome = ({ role }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // --- LOGIC PRESERVED EXACTLY ---
  const { data: fundsData = [] } = useQuery({
    queryKey: ["fundingData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-funds-data`);
      return data;
    },
  });

  const totalAmount = fundsData.reduce((total, item) => total + item.amount, 0);

  const { data: usersData = [] } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  const { data: totalDonationReqData = [] } = useQuery({
    queryKey: ["totalDonationReqData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data`);
      return res?.data;
    },
  });

  // --- PIE CHART DATA (Understandable Composition) ---
  const compositionData = [
    { name: 'Total Users', value: usersData?.length || 0 },
    { name: 'Donation Requests', value: totalDonationReqData?.length || 0 },
  ];
  const COLORS = ['#0F172A', '#EF4444']; // Slate-950 and Red-600

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      <Container>
        <div className="pt-10">
          
          {/* --- TOP HUD: AUTHENTICATION HEADER --- */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 mb-10 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
            
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="p-2 bg-red-600 rounded-lg text-white">
                    <FaShieldAlt className="animate-pulse" />
                  </div>
                  <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                    Authorized System Access
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                  BloodLink <br />
                  <span className="text-red-600 italic">
                    {role === "volunteer" ? "Volunteer" : "Admin"} Node
                  </span>
                </h1>
              </div>

              {/* USER IDENTITY WIDGET */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex items-center gap-5 min-w-[280px]">
                <div className="relative">
                  <img 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-red-600" 
                    src={user?.photoURL || "https://i.ibb.co/31mSyk3/user.png"} 
                    alt="Profile" 
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-950" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Operator</p>
                  <p className="text-xl font-black text-white tracking-tight">
                    {user?.displayName?.split(" ")[0] || "User"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">Secure Link</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- MAIN ANALYTICS GRID --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. PRIMARY BAR CHART (Volume Analytics) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl"
            >
               <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-lg">
                     <FaChartLine />
                   </div>
                   <div>
                     <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest">Growth Metrics</h3>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Volume Breakdown</p>
                   </div>
                 </div>
                 <FaSatellite className="text-slate-200 text-3xl hidden md:block animate-pulse" />
               </div>
               
               <div className="w-full h-[400px]">
                  <BarChart
                    totalUsers={usersData?.length || 0}
                    totalFundsRaised={totalAmount.toFixed(2)}
                    totalDonationRequests={totalDonationReqData?.length || 0}
                  />
               </div>
            </motion.div>

            {/* 2. SIDE HUD: COMPOSITION & FINANCE */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 flex flex-col gap-8"
            >
              {/* Pie Chart: Composition */}
              <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl flex-1">
                <div className="text-center mb-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">System Composition</h3>
                  <p className="text-[9px] font-bold text-slate-300 uppercase">Ratio of Users vs Requests</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={compositionData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {compositionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend verticalAlign="bottom" align="center" iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Visual Ratio Indicator */}
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-around text-center">
                  <div>
                    <p className="text-lg font-black text-slate-950">{usersData?.length || 0}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Users</p>
                  </div>
                  <div className="w-[1px] bg-slate-100" />
                  <div>
                    <p className="text-lg font-black text-red-600">{totalDonationReqData?.length || 0}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Requests</p>
                  </div>
                </div>
              </div>

              {/* Finance Terminal */}
              <div className="bg-slate-950 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl group">
                 <FaHandHoldingUsd className="absolute -right-4 -bottom-4 text-white/5 text-9xl rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Treasury</p>
                 <h2 className="text-5xl font-black text-red-600 tracking-tighter italic">
                    ${totalAmount.toLocaleString()}
                 </h2>
                 <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Status: Verified</span>
                    <FiActivity className="text-emerald-500 animate-pulse text-xl" />
                 </div>
              </div>
            </motion.div>

            {/* 3. BOTTOM QUICK STATS SUMMARY */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Active Members", val: usersData?.length || 0, icon: <FaUsers />, color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Demand Volume", val: totalDonationReqData?.length || 0, icon: <FaFileAlt />, color: "text-red-600", bg: "bg-red-50" },
                { label: "System Pulse", val: "99.9%", icon: <FaHistory />, color: "text-slate-950", bg: "bg-slate-100" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 shadow-sm"
                >
                   <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl shadow-inner`}>
                     {item.icon}
                   </div>
                   <div>
                      <p className="text-3xl font-black text-slate-950 tracking-tighter leading-none">{item.val}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.label}</p>
                   </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
};

export default AdminHome;

  // import { useQuery } from "@tanstack/react-query";
  // import Container from "../../../../Components/Container/Container";
  // import useAuth from "../../../../hooks/useAuth";
  // import useAxiosSecure from "../../../../hooks/useAxiosSecure";
  // import { FaUsers, FaHandHoldingUsd, FaFileAlt } from "react-icons/fa"; // Using FaUsers, FaHandHoldingUsd, FaFileAlt for relevance
  // import { BiSolidDonateBlood } from "react-icons/bi"; // Using BiSolidDonateBlood
  // import BarChart from "../../../../Components/Shared/BarChart";

  // const AdminHome = ({ role }) => {
  //   const axiosSecure = useAxiosSecure();
  //   const { user } = useAuth();

  //   const { data: fundsData = [] } = useQuery({
  //     queryKey: ["fundingData", user?.email],
  //     queryFn: async () => {
  //       const { data } = await axiosSecure.get(`/donation-funds-data`);
  //       return data;
  //     },
  //   });

  //   const amounts = fundsData.map((data) => data.amount);

  //   const totalAmount = amounts.reduce((total, amount) => {
  //     return total + amount;
  //   }, 0);

  //   // total users
  //   const { data: usersData = [] } = useQuery({
  //     queryKey: ["usersData"],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get(`/users`);
  //       return res?.data;
  //     },
  //     enabled: !!user?.email,
  //   });

  //   // fetching total blood donation request by donor
  //   const { data: totalDonationReqData = [] } = useQuery({
  //     queryKey: ["totalDonationReqData"],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get(`/create-donation-request/all-data`);
  //       return res?.data;
  //     },
  //   });

  //   // working on dynamically change  user name start
  //   const { data: userData = {} } = useQuery({
  //     queryKey: ["userData", user?.email],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get(`/users?email=${user?.email}`);
  //       return res?.data[0];
  //     },
  //     enabled: !!user?.email,
  //   });
  //   // working on dynamically change  user name end

  //   return (
  //     <Container>
  //       <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
  //         <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-10 border-l-8 border-red-600 md:flex items-center justify-between">
  //           <div>
  //             <h2 className="text-xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-3">
  //               <BiSolidDonateBlood className="text-red-600" />
  //               BloodLink – {role === "volunteer" ? <>Volunteer </> : <>Admin </>}
  //               Dashboard
  //             </h2>
  //             <p className="text-lg text-gray-500 mt-2">
  //               Welcome,{" "}
  //               <span className="font-bold">{userData?.name || "Admin"}</span>!
  //               Here's a snapshot of your system's performance.
  //             </p>
  //           </div>
  //           <div className="stats shadow mt-8 bg-gray-300">
  //             <div className="stat">
  //               <div className="stat-figure text-secondary">
  //                 <div className="avatar avatar-online">
  //                   <div className="w-16 rounded-full">
  //                     <img src={user?.photoURL} alt="User Avatar" />
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="stat-title">
  //                 {role === "volunteer" ? <>Volunteer</> : <>Admin</>}
  //               </div>
  //               <div className="stat-value">
  //                 {userData?.name?.split(" ")[0] || "Admin"}
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //           {/* Total Users */}
  //           <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-t-4 border-blue-500">
  //             <div className="card-body p-6 items-center text-center">
  //               <div className="text-blue-500 mb-3 bg-blue-100 p-4 rounded-full">
  //                 <FaUsers size={36} />
  //               </div>
  //               <h3 className="card-title text-2xl font-bold text-gray-800">
  //                 {usersData?.length || 0}
  //               </h3>
  //               <p className="text-gray-500 text-sm uppercase tracking-wide">
  //                 Total Users
  //               </p>
  //             </div>
  //           </div>

  //           {/* Funding Card */}
  //           <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-t-4 border-green-500">
  //             <div className="card-body p-6 items-center text-center">
  //               <div className="text-green-500 mb-3 bg-green-100 p-4 rounded-full">
  //                 <FaHandHoldingUsd size={36} />
  //               </div>
  //               <h3 className="card-title text-2xl font-bold text-gray-800">
  //                 ${totalAmount.toFixed(2)}
  //               </h3>
  //               <p className="text-gray-500 text-sm uppercase tracking-wide">
  //                 Total Funds Raised
  //               </p>
  //             </div>
  //           </div>

  //           {/*Total Blood Donation Requests  */}
  //           <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-t-4 border-red-600">
  //             <div className="card-body p-6 items-center text-center">
  //               <div className="text-red-600 mb-3 bg-red-100 p-4 rounded-full">
  //                 <FaFileAlt size={36} />
  //               </div>
  //               <h3 className="card-title text-2xl font-bold text-gray-800">
  //                 {totalDonationReqData?.length || 0}
  //               </h3>
  //               <p className="text-gray-500 text-sm uppercase tracking-wide">
  //                 Total Donation Requests
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="py-6 md:py-20 ">
  //           <BarChart
  //             totalUsers={usersData?.length || 0}
  //             totalFundsRaised={totalAmount.toFixed(2)}
  //             totalDonationRequests={totalDonationReqData?.length || 0}
  //           />
  //         </div>
  //       </div>
  //     </Container>
  //   );
  // };

  // export default AdminHome;
