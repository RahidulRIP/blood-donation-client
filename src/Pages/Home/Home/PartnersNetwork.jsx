import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../../../Components/Container/Container";
import { FaShieldAlt } from "react-icons/fa";
import PartnershipModal from "./components/PartnershipModal";

// const PartnersNetwork = () => {
//   const partners = [
//     {
//       id: 1,
//       name: "City Hospital",
//       logo: "https://cdn-icons-png.flaticon.com/512/883/883356.png",
//     },
//     {
//       id: 2,
//       name: "Red Crescent",
//       logo: "https://cdn-icons-png.flaticon.com/512/2371/2371441.png",
//     },
//     {
//       id: 3,
//       name: "Heart Care",
//       logo: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
//     },
//     {
//       id: 4,
//       name: "Blood Bank",
//       logo: "https://cdn-icons-png.flaticon.com/512/1043/1043323.png",
//     },
//     {
//       id: 5,
//       name: "Emergency Center",
//       logo: "https://cdn-icons-png.flaticon.com/512/3063/3063175.png",
//     },
//     {
//       id: 6,
//       name: "Med Clinic",
//       logo: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
//     },
//   ];

//   return (
//     <section className="py-20 ">
//       <Container>
//         <div className="text-center mb-16">
//           <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">
//             Our Network
//           </span>
//           <h2 className="text-2xl font-black tracking-tight mt-2 uppercase">
//             Trusted by <span className="text-red-600">80+</span> Medical
//             Institutions
//           </h2>
//         </div>

//         {/* Scrolling Logo Belt */}
//         <div className="flex overflow-hidden group">
//           <motion.div
//             initial={{ x: 0 }}
//             animate={{ x: "-50%" }}
//             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//             className="flex flex-nowrap gap-20 items-center whitespace-nowrap"
//           >
//             {/* Render logos twice for seamless loop */}
//             {[...partners, ...partners].map((partner, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
//               >
//                 <img
//                   src={partner.logo}
//                   alt={partner.name}
//                   className="w-10 h-10 object-contain"
//                 />
//                 <span className="text-xs font-black uppercase tracking-widest">
//                   {partner.name}
//                 </span>
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Bottom Verification Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="mt-20 p-8 rounded-[3rem] bg-base-200/50 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6"
//         >
//           <div className="flex items-center gap-6 ">
//             <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-red-500 shadow-xl">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-7 w-7"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                 />
//               </svg>
//             </div>
//             <div>
//               <h4 className="text-sm font-black  uppercase tracking-tight">
//                 Verified Partnership Network
//               </h4>
//               <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">
//                 Ensuring safety and rapid response across all facilities.
//               </p>
//             </div>
//           </div>
//           <button className="px-8 py-4 bg-base-100 border border-slate-200 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-600  hover:border-red-600 transition-all active:scale-95 shadow-sm">
//             Partner with us
//           </button>
//         </motion.div>
//       </Container>
//     </section>
//   );
// };

// export default PartnersNetwork;

const PartnersNetwork = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const partners = [
    {
      id: 1,
      name: "City Hospital",
      logo: "https://cdn-icons-png.flaticon.com/512/883/883356.png",
    },
    {
      id: 2,
      name: "Red Crescent",
      logo: "https://cdn-icons-png.flaticon.com/512/2371/2371441.png",
    },
    {
      id: 3,
      name: "Heart Care",
      logo: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
    },
    {
      id: 4,
      name: "Blood Bank",
      logo: "https://cdn-icons-png.flaticon.com/512/1043/1043323.png",
    },
    {
      id: 5,
      name: "Emergency Center",
      logo: "https://cdn-icons-png.flaticon.com/512/3063/3063175.png",
    },
    {
      id: 6,
      name: "Med Clinic",
      logo: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    },
  ];

  const handleShowSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <section className="fixed-spacing relative">
      <Container>
        {/* Top Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed top-10 left-1/2 -translate-x-1/2 z-[2000] bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-slate-700"
            >
              <FaCheckCircle className="text-emerald-500 text-xl" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                Application Received!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mb-16">
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">
            Our Network
          </span>
          <h2 className="text-2xl font-black tracking-tight mt-2 uppercase">
            Trusted by <span className="text-red-600">80+</span> Medical
            Institutions
          </h2>
        </div>

        {/* Scrolling Logo Belt */}
        <div className="flex overflow-hidden group py-10">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap gap-20 items-center whitespace-nowrap"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-4 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xs font-black uppercase tracking-widest">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Verification Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-8 rounded-[3.5rem] bg-slate-50 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-red-500 shadow-xl shadow-slate-200">
              <FaShieldAlt className="text-2xl" />
            </div>
            <div>
              <h4 className="text-gray-500 font-black uppercase tracking-tight">
                Verified Partnership Network
              </h4>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                Ensuring safety and rapid response across all facilities.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-base-100 border border-slate-200 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-600  hover:border-red-600 transition-all active:scale-95 shadow-sm"
          >
            Partner with us
          </button>
        </motion.div>

        {/* Modal Logic */}
        <PartnershipModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShowSuccess={handleShowSuccess}
        />
      </Container>
    </section>
  );
};

export default PartnersNetwork;
