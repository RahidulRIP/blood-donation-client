import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGavel,
  FaUserShield,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import Container from "../../../../Components/Container/Container";
import { toast } from "react-toastify";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const [activeSection, setActiveSection] = useState("acceptance");

  const handleDownload = () => {
    // 1. Trigger the toast immediately
    toast.success("PDF Download Started", {
      icon: "🩸",
      style: {
        borderRadius: "12px",
        background: "#0f172a",
        color: "#fff",
      },
    });

    // 2. Logic for the download
    const link = document.createElement("a");
    link.href = "/Terms_of_Use.pdf"; // Make sure this file exists in your 'public' folder
    link.setAttribute("download", "BloodLink_Terms.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sections = [
    { id: "acceptance", title: "1. Acceptance", icon: <FaCheckCircle /> },
    { id: "eligibility", title: "2. Eligibility", icon: <FaUserShield /> },
    { id: "conduct", title: "3. User Conduct", icon: <FaGavel /> },
    {
      id: "disclaimer",
      title: "4. Medical Disclaimer",
      icon: <FaExclamationTriangle />,
    },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-base-200 min-h-screen py-10 md:py-24 p-2.5">
      <Container>
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px]">
            Legal Framework
          </span>
          <h1 className="text-5xl font-black  tracking-tighter mt-4 uppercase">
            Terms of <span className="text-red-600">Use</span>
          </h1>
          <p className="text-slate-500 mt-6 font-medium">
            Last Updated: January 2026. Please read these terms carefully before
            using the BloodLink emergency network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Sticky Navigation */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                    activeSection === sec.id
                      ? "bg-slate-950 text-white shadow-xl shadow-slate-900/20"
                      : "bg-white text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <span
                    className={activeSection === sec.id ? "text-red-500" : ""}
                  >
                    {sec.icon}
                  </span>
                  {sec.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content Area */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100">
            <div className="prose prose-slate max-w-none space-y-12">
              <section id="acceptance" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-sm">
                    01
                  </span>
                  Acceptance of Terms
                </h2>
                <p className="text-slate-600 leading-relaxed mt-4 font-medium">
                  By accessing or using BloodLink, you agree to be bound by
                  these Terms of Use and all applicable laws and regulations. If
                  you do not agree with any of these terms, you are prohibited
                  from using or accessing this site. The materials contained in
                  this website are protected by applicable copyright and
                  trademark law.
                </p>
              </section>

              <section id="eligibility" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-sm">
                    02
                  </span>
                  User Eligibility
                </h2>
                <p className="text-slate-600 leading-relaxed mt-4 font-medium">
                  You must be at least 18 years of age to register as a donor on
                  this platform. Users between 16-18 may use the platform only
                  with parental consent and in accordance with local medical
                  regulations regarding blood donation.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-500 font-bold uppercase">
                    <FaCheckCircle className="text-red-600 mt-1" /> Accurate
                    information must be provided.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-500 font-bold uppercase">
                    <FaCheckCircle className="text-red-600 mt-1" /> Only one
                    account per individual is permitted.
                  </li>
                </ul>
              </section>

              <section id="conduct" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-sm">
                    03
                  </span>
                  Prohibited Conduct
                </h2>
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100 mt-4">
                  <p className="text-red-900 text-sm font-bold uppercase tracking-tight">
                    Users are strictly prohibited from:
                  </p>
                  <p className="text-red-700/80 text-xs mt-2 leading-relaxed font-medium">
                    Selling blood or blood products, providing fraudulent
                    medical records, harassing donors or recipients, or
                    attempting to breach the platform's security protocols.
                  </p>
                </div>
              </section>

              <section id="disclaimer" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-sm">
                    04
                  </span>
                  Medical Disclaimer
                </h2>
                <p className="text-slate-600 leading-relaxed mt-4 font-medium italic border-l-4 border-red-600 pl-6">
                  BloodLink is a facilitator and a matching platform. We are not
                  a medical provider. All blood donations and transfusions must
                  be performed by certified medical professionals at authorized
                  medical facilities. We do not guarantee the medical fitness of
                  any donor.
                </p>
              </section>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Questions? Contact legal@bloodlink.org
              </p>
              <button
                onClick={handleDownload}
                className="px-10 py-4 bg-slate-950 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-600 transition-all"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsOfUse;
