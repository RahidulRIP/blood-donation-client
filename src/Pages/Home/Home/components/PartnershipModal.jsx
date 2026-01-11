import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShieldAlt, FaCheckCircle, FaSpinner } from "react-icons/fa";

const PartnershipModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowToast(true);

    // Close modal after showing success for a moment
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2500);
  };

  return (
    <>
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-2000 flex justify-center pointer-events-none"
          >
            <div className="bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-slate-700">
              <FaCheckCircle className="text-emerald-500 text-xl" />
              <span className="text-xs font-black uppercase tracking-widest">
                Application Submitted Successfully!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={!isSubmitting ? onClose : null}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12"
            >
              {!isSubmitting && (
                <button
                  onClick={onClose}
                  className="absolute top-8 right-8 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              )}

              <div className="mb-8">
                <span className="text-red-600 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                  <FaShieldAlt /> Join the Network
                </span>
                <h2 className="text-3xl font-black text-slate-950 tracking-tighter mt-2 uppercase">
                  Partner With Us
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-2">
                  Register your institution to streamline blood requests and
                  donor management.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                      Institution Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. City Central Hospital"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                      Institution Type
                    </label>
                    <select
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                    >
                      <option value="">Select Type</option>
                      <option value="public">Public Hospital</option>
                      <option value="private">Private Clinic</option>
                      <option value="bank">Blood Bank</option>
                      <option value="ngo">NGO / Foundation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Official Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="contact@hospital.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Additional Notes
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-slate-950 transition-all shadow-xl shadow-red-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Processing...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>

              <p className="text-center text-[9px] text-slate-400 uppercase font-bold mt-8 tracking-widest leading-loose">
                By submitting, you agree to our <br />
                <span className="text-slate-950">
                  Medical Data Privacy Policy
                </span>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PartnershipModal;
