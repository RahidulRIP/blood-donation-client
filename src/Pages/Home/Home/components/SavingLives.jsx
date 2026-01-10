import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaChild,
  FaUserShield,
  FaHandsHelping,
  FaQuoteRight,
} from "react-icons/fa";
import Container from "../../../../Components/Container/Container";
import { Link } from "react-router";

const SavingLives = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const impactFlow = [
    {
      title: "Red Blood Cells",
      target: "Trauma & Surgery",
      desc: "Used for patients undergoing major surgery or those who have suffered severe blood loss.",
      icon: <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />,
    },
    {
      title: "Platelets",
      target: "Cancer Patients",
      desc: "Crucial for cancer treatments and organ transplants to help blood clot.",
      icon: <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />,
    },
    {
      title: "Plasma",
      target: "Burn Victims",
      desc: "Helps maintain blood pressure and provides proteins for healing internal injuries.",
      icon: <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />,
    },
  ];

  return (
    <section className="py-10 md:py-24 bg-base-200 overflow-hidden p-2.5">
      <Container>
        {/* Story Header */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=1000&auto=format&fit=crop"
                alt="Donation Impact"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute -bottom-10 -right-10 z-20 bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-2xl hidden md:block"
            >
              <h4 className="text-4xl font-black text-red-600">3:1</h4>
              <p className="text-[10px] font-black uppercase tracking-widest mt-2">
                Lives saved per <br />
                single pint
              </p>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">
              The Power of One
            </span>
            <h2 className="text-4xl md:text-6xl font-black  tracking-tighter mt-4 mb-8 leading-[0.9]">
              ONE PINT. <br />
              <span className="text-red-600 uppercase">THREE LIVES.</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
              Most people think their blood stays as one unit. In reality, it is
              separated into three life-saving components. Your 45-minute
              donation appointment can be the reason three different families
              get to keep their loved ones.
            </p>
            <div className="flex items-center gap-4 p-6 bg-red-50 rounded-3xl border border-red-100">
              <FaQuoteRight className="text-red-600 text-2xl opacity-20" />
              <p className="italic text-sm font-bold text-slate-700">
                "I didn't just give blood; I gave a father more time with his
                daughter."
                <span className="block text-[10px] uppercase tracking-widest mt-2 font-black text-red-600">
                  — Ariful, Regular Donor
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Component Breakdown Section */}
        <div className="bg-slate-50 rounded-[4rem] p-3.5 lg:p-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-2xl font-black text-slate-950 uppercase tracking-tight">
              How your donation is used
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              The journey from your arm to the patient's recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactFlow.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  {item.icon}
                  <h4 className="font-black text-slate-950 uppercase tracking-tight">
                    {item.title}
                  </h4>
                </div>
                <h5 className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-3">
                  Primary Use: {item.target}
                </h5>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Call to Action */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white text-xl">
                <FaChild />
              </div>
              <p className="font-black  uppercase tracking-tight">
                Pediatric Support
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white text-xl">
                <FaUserShield />
              </div>
              <p className="font-black  uppercase tracking-tight">
                Emergency Response
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white text-xl">
                <FaHandsHelping />
              </div>
              <p className="font-black  uppercase tracking-tight">
                Volunteer Network
              </p>
            </div>
          </div>

          <div className="bg-red-600 p-12 rounded-[4rem] text-white text-center md:text-left">
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">
              Become a Hero
            </h3>
            <p className="text-red-100 text-sm mb-8 font-medium">
              Join 1,200+ heroes who have already committed to saving lives this
              month.
            </p>
            <Link to={"/register"}>
              <button className="w-full py-5 bg-white text-red-600 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-950 hover:text-white transition-all shadow-xl">
                Start Your Story
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SavingLives;
