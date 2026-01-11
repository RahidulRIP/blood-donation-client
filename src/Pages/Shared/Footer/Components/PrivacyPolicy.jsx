import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaShieldAlt,
  FaEyeSlash,
  FaUserLock,
  FaDatabase,
  FaDownload,
  FaMicrochip,
  FaGlobe,
} from "react-icons/fa";
import Container from "../../../../Components/Container/Container";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const [activeTab, setActiveTab] = useState("collection");

  const policySections = [
    { id: "collection", title: "Data Collection", icon: <FaDatabase /> },
    { id: "usage", title: "How We Use Data", icon: <FaMicrochip /> },
    { id: "protection", title: "Shield Protocol", icon: <FaShieldAlt /> },
    { id: "rights", title: "Your Rights", icon: <FaUserLock /> },
  ];

  const handleDownload = () => {
    toast.success("PRIVACY PROTOCOL DOWNLOADED", {
      icon: "🔐",
      style: { borderRadius: "12px", background: "#0f172a", color: "#fff" },
      progressStyle: { background: "#dc2626" },
    });
    // Add real PDF download logic here
    // 2. Logic for the download
    const link = document.createElement("a");
    link.href = "/BloodLink_Privacy Policy.pdf"; // Make sure this file exists in your 'public' folder
    link.setAttribute("download", "BloodLink_Privacy Policy.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-base-200 min-h-screen py-10 md:py-24 p-2.5">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px]">
              Security Standards
            </span>
            <h1 className="text-5xl font-black tracking-tighter mt-4 uppercase italic">
              Privacy <span className="text-red-600">Shield</span>
            </h1>
            <p className="text-slate-500 mt-6 font-medium leading-relaxed">
              At BloodLink, we treat your medical and location data with the
              same urgency as the lives we save. Our privacy framework is built
              on absolute transparency and military-grade encryption.
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="group flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-all shadow-2xl active:scale-95"
          >
            <FaDownload className="group-hover:animate-bounce" /> Get Policy PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-3">
            {policySections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveTab(section.id);
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`w-full flex items-center justify-between px-8 py-5 rounded-2xl transition-all duration-300 border ${
                  activeTab === section.id
                    ? "bg-slate-950 border-slate-950 shadow-xl"
                    : "bg-slate-50 border-slate-100 text-slate-400 hover:border-red-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={
                      activeTab === section.id
                        ? "text-red-500"
                        : "text-slate-300"
                    }
                  >
                    {section.icon}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      activeTab === section.id ? "text-white" : ""
                    }`}
                  >
                    {section.title}
                  </span>
                </div>
                {activeTab === section.id && (
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                )}
              </button>
            ))}

            <div className="p-8 bg-red-600 rounded-[2.5rem] mt-8 text-white relative overflow-hidden group">
              <FaGlobe className="absolute -bottom-4 -right-4 text-8xl text-red-700 opacity-50 group-hover:rotate-12 transition-transform duration-700" />
              <h4 className="text-sm font-black uppercase tracking-tighter relative z-10">
                GDPR Compliant
              </h4>
              <p className="text-[10px] font-bold mt-2 opacity-80 leading-relaxed relative z-10">
                Our servers are distributed across secure zones to ensure data
                sovereignty and 100% uptime for emergency requests.
              </p>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:col-span-8 space-y-16">
            <section id="collection" className="scroll-mt-24 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-950 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <FaDatabase />
                </div>
                <h3 className="text-2xl font-black  uppercase tracking-tight">
                  1. Data Architecture
                </h3>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                We collect your **Blood Group**, **Real-time Location**, and
                **Contact Information**. This data is separated into isolated
                clusters so that your medical status is never stored alongside
                your identity in a readable format.
              </p>
            </section>

            <section id="protection" className="scroll-mt-24 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-950 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <FaShieldAlt />
                </div>
                <h3 className="text-2xl font-black  uppercase tracking-tight">
                  2. Shield Protocol (AES-256)
                </h3>
              </div>
              <div className="bg-slate-950 p-8 rounded-[2.5rem] text-slate-300 border border-white/5">
                <div className="flex items-start gap-4 mb-4">
                  <FaEyeSlash className="text-red-600 text-xl" />
                  <p className="text-xs font-bold leading-relaxed">
                    Zero-Knowledge Encryption: Our admins cannot see your exact
                    location logs. The system only triggers alerts based on
                    proximity math without exposing raw coordinates to human
                    staff.
                  </p>
                </div>
                <div className="h-0.5 w-full bg-white/5 my-4" />
                <p className="text-[10px] text-slate-500 font-mono">
                  &gt; Encrypting medical_data_v4... <br />
                  &gt; Handshake TLS 1.3 Secure... <br />
                  &gt; Status: PROTECTED
                </p>
              </div>
            </section>

            <section id="rights" className="scroll-mt-24 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-950 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <FaUserLock />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  3. Sovereignty & Rights
                </h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Right to Erase",
                  "Right to Access",
                  "Data Portability",
                  "Stop Tracking",
                ].map((right, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-600 tracking-widest"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {right}
                  </li>
                ))}
              </ul>
            </section>

            <footer className="pt-10 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Secure Node: 092-XPL-PRV
              </p>
              <p className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] animate-pulse">
                System Status: encrypted
              </p>
            </footer>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
