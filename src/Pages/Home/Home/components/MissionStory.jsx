import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaHistory } from "react-icons/fa";
import Container from "../../../../Components/Container/Container";


const MissionStory = () => {
  const values = [
    {
      icon: <FaBullseye />,
      title: "Our Mission",
      desc: "To bridge the gap between blood donors and those in urgent need through technology and community action.",
    },
    {
      icon: <FaEye />,
      title: "Our Vision",
      desc: "A world where no life is lost due to a lack of blood, and where donation is a seamless, everyday act of kindness.",
    },
    {
      icon: <FaHistory />,
      title: "Our Story",
      desc: "Started by a group of volunteers in 2024, we've grown into a nationwide network of life-savers.",
    },
  ];

  return (
    <section className="py-24 bg-base-200 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-black  tracking-tighter mt-4 mb-8 leading-tight">
              WE ARE ON A MISSION TO <br />
              <span className="text-red-600">SAVE EVERY DROP.</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
              BloodLink isn't just a platform; it's a movement. We believe that technology should be used to solve humanity's most urgent problems. By connecting donors directly with hospitals, we reduce the time it takes to find a match from hours to minutes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-6 rounded-3xl bg-base-200/50 border border-slate-100">
                  <h4 className="font-black  text-3xl mb-1">100%</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-600">Non-Profit Focus</p>
               </div>
               <div className="p-6 rounded-3xl bg-base-200/50 border border-slate-100">
                  <h4 className="font-black text-3xl mb-1">24/7</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-600">Emergency Support</p>
               </div>
            </div>
          </div>

          {/* Visual Cards */}
          <div className="lg:w-1/2 space-y-6">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-slate-950 text-white group hover:bg-red-600 transition-all duration-500"
              >
                <div className="text-3xl text-red-500 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 group-hover:text-red-100 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MissionStory;