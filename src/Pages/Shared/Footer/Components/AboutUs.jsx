import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaUsers,
  FaHandHoldingHeart,
  FaAward,
} from "react-icons/fa";
import Container from "../../../../Components/Container/Container";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const AboutUs = () => {
  const { user } = useAuth();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const stats = [
    {
      label: "Lives Saved",
      value: "12k+",
      icon: <FaHeartbeat className="text-red-600" />,
    },
    {
      label: "Active Donors",
      value: "8.5k",
      icon: <FaUsers className="text-red-600" />,
    },
    {
      label: "Hospitals",
      value: "80+",
      icon: <FaAward className="text-red-600" />,
    },
  ];

  const values = [
    {
      title: "Radical Transparency",
      desc: "Track every drop. We provide real-time updates from request to successful transfusion.",
      icon: <FaHandHoldingHeart size={24} />,
    },
    {
      title: "Speed Protocol",
      desc: "Our smart-routing system connects donors to the nearest emergency in under 120 seconds.",
      icon: <FaHeartbeat size={24} />,
    },
  ];

  return (
    <section className="py-10 md:py-24 bg-base-200 overflow-hidden p-2.5">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Visual & Stats */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-slate-50"
            >
              {/* DIRECT IMAGE LINK FROM UNSPLASH SOURCE */}
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Medical Laboratory"
                className="w-full h-[500px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Floating Stat Card */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl md:bottom-10 md:-right-5 md:left-auto"
              >
                <div className="flex justify-around md:gap-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="flex justify-center mb-1 text-sm md:text-base">
                        {stat.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-slate-950">
                        {stat.value}
                      </h3>
                      <p className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Background Blur */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-red-100 rounded-full blur-[100px] opacity-60" />
          </div>

          {/* Right Side: Content */}
          <div className="space-y-10">
            <div>
              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px]">
                Our Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mt-4 uppercase">
                Bridging the Gap Between{" "}
                <span className="text-red-600 underline decoration-red-200 underline-offset-8">
                  Life
                </span>{" "}
                and Loss.
              </h2>
              <p className="text-slate-500 mt-8 text-base md:text-lg font-medium leading-relaxed">
                BloodLink isn't just a database; it's a high-speed emergency
                response network. Founded on the belief that no life should be
                lost due to a lack of data, we digitize the blood supply chain
                to save lives in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-[2.5rem] bg-slate-50 hover:bg-slate-950 transition-all duration-500 border border-slate-100"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                    {val.icon}
                  </div>
                  <h4 className="text-sm font-black text-slate-950 uppercase mt-6 group-hover:text-white tracking-tight">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-bold mt-3 leading-loose group-hover:text-slate-500 transition-colors">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>

            {!user && (
              <div className="pt-4">
                <Link to={"/register"}>
                  <button className="group px-10 py-5 bg-slate-950 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-600 transition-all shadow-xl active:scale-95 flex items-center gap-4">
                    Join With Us
                    <span className="w-2 h-2 rounded-full bg-red-600 group-hover:bg-white animate-pulse" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
