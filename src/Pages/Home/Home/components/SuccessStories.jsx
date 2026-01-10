import React, { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaQuoteLeft, FaHeart, FaStar, FaHistory } from "react-icons/fa";
import Container from "../../../../Components/Container/Container";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const SuccessStories = () => {
  const { user } = useAuth();
  // 1. Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 2. Smooth Scroll Reset on Mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const stories = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Recipient",
      story:
        "During my emergency surgery, the hospital ran out of O- blood. This platform connected my family to a donor in 15 minutes. That donor saved my life.",
      // A clear, high-quality portrait of a smiling woman
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1000",
      impact: "Emergency Recovery",
    },
    {
      id: 2,
      name: "David Chen",
      role: "Regular Donor",
      story:
        "I never knew where my blood went until I got a notification that it helped a pediatric patient. Knowing I made a difference is the best feeling.",
      // A professional, kind-looking man
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1000",
      impact: "50+ Donations",
    },
    {
      id: 3,
      name: "The Miller Family",
      role: "Community",
      story:
        "We organized a local drive through this app. We collected 40 units in one day, potentially saving 120 lives in our neighborhood.",
      // A warm group/community shot
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000",
      impact: "Community Drive",
    },
  ];

  return (
    <>
      {/* 3. Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 z-100 origin-left"
        style={{ scaleX }}
      />

      <section className="py-10 md:py-24 bg-base-200 overflow-hidden p-2.5">
        <Container>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs flex items-center gap-2">
                <FaHeart className="animate-pulse" /> Impact Stories
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mt-4">
                LIVES CHANGED <br />
                <span className="text-red-600 uppercase">FOREVER.</span>
              </h2>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-red-200">
                <FaStar />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">
                  Total Impact
                </p>
                <p className="text-xl font-black text-slate-950 tracking-tight">
                  2,500+ Lives Saved
                </p>
              </div>
            </div>
          </div>

          {/* Featured Story (Hero Layout) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative w-full h-[450px] md:h-[400px] rounded-[4rem] overflow-hidden mb-20 group shadow-2xl"
          >
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16 text-white">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Featured Story
                </span>
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <FaHistory /> Jan 2026
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight max-w-3xl">
                "Without the O- donor I found here, my son's heart surgery
                wouldn't have been possible."
              </h3>
              <p className="text-slate-300 font-medium text-lg">
                — Maria Rodriguez, Mother of Mateo
              </p>
            </div>
          </motion.div>

          {/* Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 rounded-[3.5rem] p-10 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-slate-100 group"
              >
                <div className="relative w-20 h-20 mb-8">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover rounded-4xl shadow-lg group-hover:rotate-6 transition-transform"
                    alt=""
                  />
                  <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-2 rounded-xl text-[10px]">
                    <FaQuoteLeft />
                  </div>
                </div>

                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">
                  {item.role}
                </h4>
                <h5 className="text-xl font-black text-slate-950 mb-4">
                  {item.name}
                </h5>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 italic">
                  "{item.story}"
                </p>

                <div className="pt-6 border-t border-slate-200">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-950 transition-colors">
                    Impact: {item.impact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Footer */}
          <div className="mt-24 p-12 bg-red-600 rounded-[4rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">
              Write your own story
            </h3>
            <p className="text-red-100 mb-10 font-medium max-w-xl mx-auto">
              Your donation today is the success story of tomorrow. Join the
              movement.
            </p>
            {!user && (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to={"/register"}>
                  <button className="px-10 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-xl">
                    First Become a Donor
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default SuccessStories;
