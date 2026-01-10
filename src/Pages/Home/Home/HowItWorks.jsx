import React from "react";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaSearchLocation,
  FaHandHoldingHeart,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router"; // Import Link
import Container from "../../../Components/Container/Container";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Register",
      desc: "Join our community of heroes. Create your profile in seconds.",
      icon: <FaUserPlus />,
      color: "bg-blue-500",
      path: "/register", // Path to Registration
    },
    {
      id: 2,
      title: "Search / Request",
      desc: "Find blood donors nearby or post an urgent request for help.",
      icon: <FaSearchLocation />,
      color: "bg-amber-500",
      path: "/search-page", // Path to Search/Donor list
    },
    {
      id: 3,
      title: "Donate / Receive",
      desc: "Connect with the person in need and finalize the donation.",
      icon: <FaHandHoldingHeart />,
      color: "bg-red-600",
      path: "/donate-blood", // Path to Requests feed
    },
    {
      id: 4,
      title: "Save a Life",
      desc: "Complete the process and make a direct impact on a life.",
      icon: <FaCheckCircle />,
      color: "bg-emerald-500",
      path: "/success-stories", // Path to Community/Blog
    },
  ];

  return (
    <section className="fixed-spacing  bg-base-200 relative overflow-hidden ">
      <Container>
        {/* Section Header */}
        <div className="text-center">
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-2">
            HOW IT <span className="text-red-600">WORKS</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium max-w-lg mx-auto">
            Saving a life is easier than you think. Follow these four simple
            steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-300/30 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative z-10"
            >
              <Link
                to={step.path}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Step Number Circle */}
                <div className="absolute -top-4 -right-2 w-8 h-8 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-sm z-20">
                  0{step.id}
                </div>

                {/* Icon Box */}
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-2xl text-slate-950 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 mb-8 group-hover:rotate-6 group-hover:scale-110">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-black mb-3 tracking-tight group-hover:text-red-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed px-4">
                  {step.desc}
                </p>

                {/* Status Indicator Bar */}
                <div className="mt-6 w-12 h-1 rounded-full bg-slate-300/30 group-hover:w-24 group-hover:bg-red-600 transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
