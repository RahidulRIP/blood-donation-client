import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaAward } from "react-icons/fa";
import Container from "../../../Components/Container/Container";

const TopDonors = () => {
  const donors = [
    {
      id: 1,
      name: "Ariful Islam",
      location: "Dhaka, BD",
      donations: 12,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop",
      message:
        "Knowing that my blood helped a child recover is the greatest feeling in the world.",
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      location: "Chittagong, BD",
      donations: 8,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
      message:
        "The platform made it so easy to find a hospital in need during a critical emergency.",
    },
    {
      id: 3,
      name: "Tanvir Hossain",
      location: "Sylhet, BD",
      donations: 15,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
      message:
        "I've been a regular donor for 5 years. This system is the most transparent I've used.",
    },
  ];

  return (
    <section className="fixed-spacing  relative overflow-hidden ">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Content */}
          <div className="lg:w-1/3">
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">
              Our Heroes
            </span>
            <h2 className="text-4xl md:text-5xl font-black  tracking-tighter mt-2 mb-6">
              TOP <span className="text-red-600">DONORS</span> <br />
              OF THE MONTH
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              Every drop counts. We celebrate those who consistently step
              forward to save lives in our community.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-base-200/50 border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white text-xl shadow-lg shadow-amber-500/20">
                <FaAward />
              </div>
              <div>
                <p className="text-xs font-black  uppercase tracking-widest">
                  Global Rank
                </p>
                <p className="text-[10px] font-bold text-slate-400">
                  Top 1% of contributors this year
                </p>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {donors.map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-base-200/40 p-6 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200"
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="text-red-600/10 text-4xl absolute top-8 right-8 group-hover:text-red-600/20 transition-colors" />

                <div className="relative mb-6">
                  <img
                    src={donor.image}
                    alt={donor.name}
                    className="w-20 h-20 rounded-3xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-slate-950 text-white w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black border-2 border-white">
                    {donor.donations}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-black  leading-tight truncate">
                    {donor.name}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {donor.location}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                  "{donor.message}"
                </p>

                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-[10px]" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopDonors;
