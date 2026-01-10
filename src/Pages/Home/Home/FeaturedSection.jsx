import { FaUserFriends, FaMapMarkerAlt, FaHeartbeat } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import Container from "../../../Components/Container/Container";
import { motion } from "framer-motion";

const FeaturedSection = () => {
  const features = [
    {
      icon: FaHeartbeat,
      title: "Impact Lives",
      description:
        "One pint can save three lives. Join a movement that turns compassion into action every single day.",
      stat: "3 LIVES",
      accent: "from-red-500 to-rose-600",
      shadow: "shadow-red-500/10",
      border: "hover:border-red-500/50",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Find Centers",
      description:
        "Our smart locator finds the closest donation points in real-time, so you can give when it's most convenient.",
      stat: "500+",
      accent: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-500/10",
      border: "hover:border-blue-500/50",
    },
    {
      icon: FaUserFriends,
      title: "Hero Network",
      description:
        "Track your contributions, earn unique lifesaver badges, and connect with a community of heroes.",
      stat: "10K+",
      accent: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/10",
      border: "hover:border-emerald-500/50",
    },
  ];

  return (
    <section className="relative fixed-spacing  bg-base-200 transition-colors duration-700 overflow-hidden">
      {/* Subtle Background Glows to keep base-200 interesting */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        {/* Header Section */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-slate-200 dark:border-zinc-700 mb-6"
          >
            <span className="bg-linear-to-r from-red-600 to-rose-500 bg-clip-text text-transparent text-xs font-black uppercase tracking-[0.2em]">
              Our Core Mission
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black  tracking-tighter leading-tight"
          >
            WHY <span className="text-red-600 italic">BLOODLINK</span> MATTERS?
          </motion.h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-transparent ${feature.border} ${feature.shadow} hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}
            >
              {/* Animated Icon Container */}
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.accent} flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-12 transition-transform duration-500`}
              >
                <feature.icon size={28} />
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {feature.title}
                  </h3>
                  <span className="text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                    Live
                  </span>
                </div>

                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              {/* Impact Stat Divider */}
              <div className="my-8 h-px bg-slate-100 dark:bg-zinc-800 w-full" />

              {/* Bottom Row: Stat & Action */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {feature.stat}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Impact reached
                  </p>
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black group-hover:bg-red-600 group-hover:text-white transition-colors shadow-md`}
                >
                  <HiArrowRight className="-rotate-140" size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedSection;

// import { FaUserFriends, FaMapMarkerAlt, FaHeartbeat } from "react-icons/fa";
// import Container from "../../../Components/Container/Container";

// const FeaturedSection = () => {
//   const features = [
//     {
//       icon: FaHeartbeat,
//       title: "Make an Impact",
//       description:
//         "A single donation can save up to three lives. See how your contribution directly helps patients in need across the country.",
//       stat: "3 LIVES",
//       statLabel: "Saved Per Donation",
//       color: "text-red-600",
//     },
//     {
//       icon: FaMapMarkerAlt,
//       title: "Find a Drive Near You",
//       description:
//         "Use our locator to find the nearest blood donation centers and mobile drives. Schedule your appointment in minutes.",
//       stat: "500+",
//       statLabel: "Active Donation Centers",
//       color: "text-blue-500",
//     },
//     {
//       icon: FaUserFriends,
//       title: "Join Our Community",
//       description:
//         "Become part of the BloodLink family. Track your donation history, earn badges, and motivate others to give.",
//       stat: "10K+",
//       statLabel: "Registered Donors",
//       color: "text-green-500",
//     },
//   ];

//   return (
//     <div className="py-16 bg-gray-50">
//       <Container>
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
//             Why <span className="text-red-600">BloodLink</span> Matters
//           </h2>
//           <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
//             Our mission is simple: connecting donors to those in urgent need.
//             See the difference we make.
//           </p>
//         </div>

//         {/* Featured Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-red-600"
//             >
//               <div className="flex items-center justify-between">
//                 <div
//                   className={`${feature.color} bg-opacity-10 p-3 rounded-full mb-4`}
//                 >
//                   <feature.icon className="w-8 h-8" />
//                 </div>
//                 <div className="text-right">
//                   <p className="text-4xl font-bold text-gray-800">
//                     {feature.stat}
//                   </p>
//                   <p className="text-sm text-gray-500 font-semibold">
//                     {feature.statLabel}
//                   </p>
//                 </div>
//               </div>

//               <h3 className="text-2xl font-bold text-gray-800 mt-6">
//                 {feature.title}
//               </h3>
//               <p className="mt-4 text-gray-600 min-h-[72px]">
//                 {feature.description}
//               </p>

//               <button
//                 className={`mt-6 text-sm font-semibold flex items-center gap-2 ${feature.color} hover:underline`}
//               >
//                 Learn More
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14 5l7 7m0 0l-7 7m7-7H3"
//                   />
//                 </svg>
//               </button>
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default FeaturedSection;
