import React, { useEffect } from "react";
import { motion } from "framer-motion";

import {
  FaCookieBite,
  FaShieldAlt,
  FaChartLine,
  FaTools,
  FaCheck,
} from "react-icons/fa";
import Container from "../../../../Components/Container/Container";

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const cookieTypes = [
    {
      title: "Essential Cookies",
      desc: "Necessary for the platform to function. These handle secure login and emergency request routing.",
      icon: <FaShieldAlt />,
      required: true,
    },
    {
      title: "Performance Cookies",
      desc: "Help us understand how the LifeStream feed is performing and identify any technical bugs.",
      icon: <FaChartLine />,
      required: false,
    },
    {
      title: "Functional Cookies",
      desc: "Remember your language preferences and last search radius for blood donors.",
      icon: <FaTools />,
      required: false,
    },
  ];

  return (
    <div className="bg-base-200 min-h-screen py-10 md:py-24 p-2.5">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 text-red-600 rounded-full mb-6 animate-bounce">
              <FaCookieBite size={40} />
            </div>
            <h1 className="text-5xl font-black  tracking-tighter uppercase italic">
              Cookie <span className="text-red-600">Policy</span>
            </h1>
            <p className="text-slate-500 mt-6 font-medium text-lg">
              We use cookies to ensure that our emergency network stays fast,
              secure, and reliable.
            </p>
          </div>

          {/* Content Body */}
          <div className="space-y-12">
            <section className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4">
                What are Cookies?
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Cookies are small data files stored on your device. On
                BloodLink, they act as a "memory" for the system—allowing us to
                recognize you, keep your session active, and ensure that blood
                requests reach you without delay.
              </p>
            </section>

            {/* Cookie Table / Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cookieTypes.map((type, index) => (
                <div
                  key={index}
                  className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {type.icon}
                  </div>
                  <h4 className="text-sm font-black text-slate-950 uppercase mb-3">
                    {type.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed mb-6">
                    {type.desc}
                  </p>
                  <div className="flex items-center gap-2">
                    {type.required ? (
                      <span className="text-[9px] font-black uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full">
                        Always Active
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Table */}
            <div className="overflow-hidden rounded-4xl border border-slate-100 shadow-sm mt-12">
              <table className="w-full text-left text-xs font-bold uppercase tracking-widest">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-8 py-5">Cookie Name</th>
                    <th className="px-8 py-5">Duration</th>
                    <th className="px-8 py-5">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-500">
                  <tr>
                    <td className="px-8 py-6 font-black">_auth_session</td>
                    <td className="px-8 py-6">30 Days</td>
                    <td className="px-8 py-6">Secure Login Persistence</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-black ">_geo_loc_cache</td>
                    <td className="px-8 py-6">Session</td>
                    <td className="px-8 py-6">Speed Protocol Optimization</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CookiePolicy;
