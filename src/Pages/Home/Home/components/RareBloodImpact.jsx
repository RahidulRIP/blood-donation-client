import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMicroscope,
  FaExclamationTriangle,
  FaSearchLocation,
  FaChartLine,
} from "react-icons/fa";
import Container from "../../../../Components/Container/Container";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const RareBloodImpact = () => {
  const { user } = useAuth();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const rarityStats = [
    { label: "AB Negative", percentage: "0.6%", color: "bg-red-600" },
    { label: "B Negative", percentage: "1.5%", color: "bg-slate-900" },
    { label: "A Negative", percentage: "6.3%", color: "bg-slate-700" },
    { label: "O Negative", percentage: "6.6%", color: "bg-red-400" },
  ];

  return (
    <section className="py-10 md:py-24 bg-base-200 overflow-hidden p-2.5">
      <Container>
        {/* Medical Header */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          <div className="lg:w-2/3">
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">
              Medical Analysis
            </span>
            <h2 className="text-4xl md:text-6xl font-black  tracking-tighter mt-4 mb-6 leading-[0.9]">
              THE SILENT CRISIS OF <br />
              <span className="text-red-600 uppercase">RARE BLOOD GROUPS</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              In critical emergencies, the difference between life and death is
              often measured in minutes. For patients with rare blood types,
              those minutes are often spent in a desperate search for a
              compatible donor.
            </p>
          </div>
          <div className="lg:w-1/3 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <FaExclamationTriangle className="text-amber-500 text-3xl mb-4" />
            <h4 className="font-black text-slate-950 uppercase text-sm mb-2">
              Urgency Level: Critical
            </h4>
            <p className="text-xs text-slate-500 font-bold leading-relaxed">
              Only 1 in 167 people have AB- blood, making it the rarest common
              type globally.
            </p>
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Rarity Chart */}
          <div className="lg:col-span-2 bg-slate-950 rounded-[3.5rem] p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px]" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-10 flex items-center gap-3">
              <FaChartLine className="text-red-600" /> Global Rarity
              Distribution
            </h3>

            <div className="space-y-8 relative z-10">
              {rarityStats.map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>{stat.label}</span>
                    <span className="text-red-500">{stat.percentage}</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width:
                          stat.percentage === "0.6%" ? "10%" : stat.percentage,
                      }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                      className={`h-full ${stat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
              *Data represents percentage of global population.
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-6">
            <div className="p-8 rounded-[3rem] bg-red-600 text-white group hover:bg-red-700 transition-all cursor-pointer">
              <FaMicroscope className="text-3xl mb-6 group-hover:rotate-12 transition-transform" />
              <h4 className="text-xl font-black uppercase tracking-tight mb-2">
                Genetic Rarity
              </h4>
              <p className="text-xs font-medium text-red-100 leading-relaxed">
                Some types like 'Golden Blood' (Rh-null) are found in fewer than
                50 people worldwide.
              </p>
            </div>

            <Link to={"/search-page"}>
              <div className="p-8 rounded-[3rem] bg-base-200/50 border border-slate-100 group hover:bg-base-100 hover:shadow-2xl transition-all cursor-pointer">
                <FaSearchLocation className="text-3xl  mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-black  uppercase tracking-tight mb-2">
                  Digital Tracking
                </h4>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Our algorithm prioritizes rare type notifications to donors
                  within a 50km radius of the hospital.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Conclusion / Medical Insight */}
        <div className="max-w-4xl mx-auto text-center border-t border-slate-100 pt-20">
          <h3 className="text-2xl font-black  mb-6 uppercase italic">
            "The Universal Donor Myth"
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            While O- is the universal donor, patients with rare types often
            cannot receive any blood other than their exact match. This is why
            maintaining a verified database of <b>rare-type heroes</b> is our
            platform's highest priority.
          </p>
          {!user && (
            <Link
              to={"/register"}
              className="px-10 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all active:scale-95 shadow-2xl"
            >
              Register as Rare Donor
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
};

export default RareBloodImpact;
