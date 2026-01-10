import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaAppleAlt,
  FaGlassWhiskey,
  FaHamburger,
  FaBed,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Container from "../../../../Components/Container/Container";

const NutritionGuide = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const prepSteps = [
    {
      title: "Iron Focus",
      desc: "Eat iron-rich foods like spinach, red meat, or beans 2 days before.",
      icon: <FaAppleAlt className="text-red-500" />,
      type: "do",
    },
    {
      title: "Hydration",
      desc: "Drink 500ml of water right before your appointment.",
      icon: <FaGlassWhiskey className="text-blue-500" />,
      type: "do",
    },
    {
      title: "Avoid Fats",
      desc: "Skip fatty foods (fries/burgers) as they affect blood testing.",
      icon: <FaHamburger className="text-slate-400" />,
      type: "dont",
    },
    {
      title: "Rest Up",
      desc: "Ensure at least 7-8 hours of sleep the night before.",
      icon: <FaBed className="text-amber-500" />,
      type: "do",
    },
  ];

  return (
    <section className="py-10 md:py-24 bg-base-200 p-2.5">
      <Container>
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">
            Medical Prep
          </span>
          <h2 className="text-4xl md:text-5xl font-black  tracking-tighter mt-4 mb-6">
            NUTRITION GUIDE <br />
            <span className="text-red-600 uppercase">Prepare Your Body</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            What you eat and drink significantly impacts how you feel after
            donating. Follow this timeline to ensure a safe and successful
            life-saving experience.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Do's and Don'ts Cards */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-red-600 rounded-full" />
              Pre-Donation Protocol
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prepSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-[2rem] bg-base-200/50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {step.type === "do" ? (
                      <FaCheckCircle className="text-green-500 text-xs" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xs" />
                    )}
                    <h4 className="font-black text-sm uppercase tracking-tight">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Post-Donation Recovery Visual */}
          <div className="bg-slate-950 rounded-[3.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px]" />

            <h3 className="text-2xl font-black uppercase tracking-tight mb-6">
              The Recovery Plate
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              After donating, your body needs to replace lost fluids and iron.
              Focus on these three pillars:
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-red-500 flex items-center justify-center text-[10px] font-black">
                  01
                </div>
                <div>
                  <h5 className="font-black text-xs uppercase tracking-widest text-red-500">
                    Immediate Sugar
                  </h5>
                  <p className="text-xs text-slate-400">
                    Have a juice and biscuit immediately to prevent dizziness.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-red-500 flex items-center justify-center text-[10px] font-black">
                  02
                </div>
                <div>
                  <h5 className="font-black text-xs uppercase tracking-widest text-red-500">
                    24H Hydration
                  </h5>
                  <p className="text-xs text-slate-400">
                    Drink 10-12 glasses of water to restore blood volume.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-red-500 flex items-center justify-center text-[10px] font-black">
                  03
                </div>
                <div>
                  <h5 className="font-black text-xs uppercase tracking-widest text-red-500">
                    Vitamin C
                  </h5>
                  <p className="text-xs text-slate-400">
                    Oranges and lemons help your body absorb iron faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tip Banner */}
        <div className="bg-red-50 border border-red-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-red-200">
            <FaAppleAlt />
          </div>
          <div>
            <h4 className="font-black text-slate-950 uppercase tracking-tight">
              The "Iron Hero" Tip
            </h4>
            <p className="text-sm text-slate-600 font-medium">
              Combining iron-rich foods with Vitamin C (like steak with a glass
              of orange juice) increases iron absorption by up to 300%!
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NutritionGuide;
