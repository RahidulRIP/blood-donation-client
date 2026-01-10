import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaMinus,
  FaInfoCircle,
  FaUtensils,
  FaTint,
} from "react-icons/fa";


import Container from "../../../Components/Container/Container";
import { MdBedtime } from "react-icons/md";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 56 days. This allows your body enough time to replenish its red blood cells completely.",
    },
    {
      question: "Is there an age limit for donation?",
      answer:
        "Generally, donors must be at least 18 years old and weigh at least 50kg to be eligible for donation.",
    },
    {
      question: "What should I eat before donating?",
      answer:
        "Have a healthy, low-fat meal and stay well-hydrated. Avoid fatty foods like burgers or fries as they can affect blood tests.",
    },
  ];

  const prepTips = [
    {
      icon: <FaUtensils />,
      title: "Healthy Meal",
      text: "Eat iron-rich foods.",
    },
    { icon: <MdBedtime />, title: "Rest Well", text: "Get 8 hours of sleep." },
    { icon: <FaTint />, title: "Hydrate", text: "Drink plenty of water." },
  ];

  return (
    <section className="fixed-spacing  bg-base-200 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Preparation Tips */}
          <div className="lg:w-1/3">
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">
              Preparation
            </span>
            <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8">
              BEFORE YOU <span className="text-red-600">DONATE</span>
            </h2>

            <div className="space-y-4">
              {prepTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-5 p-6 rounded-3xl bg-base-200/50 border border-slate-100 hover:bg-base-100 hover:shadow-xl hover:shadow-slate-200 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center text-lg">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-black  uppercase text-xs tracking-widest">
                      {tip.title}
                    </h4>
                    <p className="text-slate-500 text-sm font-medium">
                      {tip.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:w-2/3 bg-slate-950 rounded-[3rem] p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <FaInfoCircle className="text-red-500" />
                <span className="text-white font-black uppercase tracking-widest text-xs">
                  Common Questions
                </span>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-white/10 pb-4">
                    <button
                      onClick={() =>
                        setActiveIndex(activeIndex === index ? null : index)
                      }
                      className="w-full flex justify-between items-center py-4 text-left group"
                    >
                      <span
                        className={`text-lg font-bold transition-colors ${
                          activeIndex === index
                            ? "text-red-500"
                            : "text-white group-hover:text-red-400"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <div className="text-white">
                        {activeIndex === index ? (
                          <FaMinus size={12} />
                        ) : (
                          <FaPlus size={12} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-400 text-sm leading-relaxed pb-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
