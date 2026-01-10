import React from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaBullhorn, FaHeart, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import Container from "../../../Components/Container/Container";
import useAuth from "../../../hooks/useAuth";

const VolunteerCTA = () => {
  const { user } = useAuth();
  const benefits = [
    { icon: <FaHandshake />, text: "Organize Local Blood Drives" },
    { icon: <FaBullhorn />, text: "Spread Awareness in Schools" },
    { icon: <FaHeart />, text: "Support Emergency Logistics" },
  ];

  return (
    <section className="fixed-spacing  bg-base-200 overflow-hidden">
      <Container>
        <div className="bg-slate-950 rounded-[4rem] overflow-hidden relative shadow-2xl">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col lg:flex-row">
            {/* Image/Visual Side */}
            <div className="lg:w-1/2 relative min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Volunteers"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:opacity-80 hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-950 lg:hidden" />
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 p-12 lg:p-20 relative z-10 flex flex-col justify-center">
              <span className="text-red-500 font-black uppercase tracking-[0.3em] text-xs mb-4">
                Join the Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6">
                DON'T JUST GIVE BLOOD, <br />
                <span className="text-red-500">GIVE YOUR TIME.</span>
              </h2>
              <p className="text-slate-400 font-medium text-lg mb-10 max-w-lg">
                Our volunteer network is the backbone of this platform. Help us
                coordinate between donors and hospitals to ensure no request
                goes unanswered.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-12">
                {benefits.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-white font-bold tracking-tight text-sm uppercase group-hover:text-red-500 transition-colors">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-6">
                {!user && (
                  <Link to="/register">
                    <button className="px-10 py-5 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95 shadow-xl">
                      Become a Volunteer
                    </button>
                  </Link>
                )}
                <Link
                  to="/about"
                  className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px] hover:text-red-500 transition-colors"
                >
                  Learn More <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VolunteerCTA;
