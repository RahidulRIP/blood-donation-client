import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUsers, FaHospital, FaTint, FaUserCircle } from "react-icons/fa";
import Container from "../../../Components/Container/Container";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6";

const StatsImpact = () => {
  const { user } = useAuth();
  const stats = [
    {
      id: 1,
      label: "Happy Donors",
      value: "1.2k+",
      icon: <FaUsers className="text-blue-500" />,
      description: "Active heroes ready to help.",
    },
    {
      id: 2,
      label: "Lives Saved",
      value: "3.5k+",
      icon: <FaHeartbeat className="text-red-600" />,
      description: "Successful blood transitions.",
    },
    {
      id: 3,
      label: "Hospitals",
      value: "85+",
      icon: <FaHospital className="text-amber-500" />,
      description: "Connected medical centers.",
    },
    {
      id: 4,
      label: "Blood Groups",
      value: "8",
      icon: <FaTint className="text-red-500" />,
      description: "All major types available.",
    },
  ];

  return (
    <section className="fixed-spacing relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        {/* --- ADDED HEADER SECTION --- */}
        <div className="text-center mb-16 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 font-black uppercase tracking-[0.3em] text-xs"
          >
            Our Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tighter mt-3"
          >
            MAKING A <span className="text-red-600 uppercase">Difference</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-500 font-medium max-w-lg mx-auto leading-relaxed"
          >
            Transparency is at our core. See how our community of donors and
            medical partners are saving lives every single day.
          </motion.p>
        </div>
        {/* --- END HEADER SECTION --- */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-8 rounded-[3rem] bg-base-200/50 border border-transparent hover:border-red-500/10 hover:bg-base-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 group"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {stat.icon}
              </div>

              {/* Stats Value */}
              <h3 className="text-4xl font-black mb-1 tracking-tighter">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600 mb-4">
                {stat.label}
              </p>

              {/* Description */}
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Footer inside Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-12 rounded-[4rem] bg-slate-950 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
                Ready to become a{" "}
                <span className="text-red-500">Life Saver?</span>
              </h2>
              <p className="text-slate-400 font-medium">
                Your single donation can save up to three lives. Join our
                community of heroes today and make a real difference in
                someone's life.
              </p>
            </div>

            {/* <div className="flex gap-4">
              <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-900/20">
                Register Now
              </button>
            </div> */}
            <div className="flex gap-4 items-center">
              {user ? (
                /* --- SHOW THIS IF LOGGED IN --- */
                <div className="flex items-center gap-4 bg-slate-50 p-2 pr-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profile"
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <FaUserCircle size={24} />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tight">
                      Welcome Back
                    </p>
                    <p className="text-sm font-black text-slate-950 uppercase tracking-tighter">
                      Hero, {user.displayName?.split(" ")[0] || "Donor"}
                    </p>
                  </div>
                  <button className="ml-4 p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                    <FaArrowRight size={14} />
                  </button>
                </div>
              ) : (
                /* --- SHOW THIS IF NOT LOGGED IN --- */
                <Link
                  to={"/register"}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-900/20"
                >
                  Register Now
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsImpact;
