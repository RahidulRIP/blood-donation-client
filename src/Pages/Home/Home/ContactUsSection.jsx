import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Essential styles
import Container from "../../../Components/Container/Container";

const ContactUsSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trigger loading toast
    const id = toast.loading("Verifying your message...", {
      position: "bottom-right",
      theme: "dark",
    });

    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Update loading toast to success
      toast.update(id, {
        render: "Message Sent Successfully! 🩸",
        type: "success",
        isLoading: false,
        autoClose: 4000,
        closeButton: true,
        // Custom styling for Toastify
        style: {
          backgroundColor: "#18181b",
          color: "#fff",
          borderRadius: "15px",
          border: "1px solid #ef4444",
        }
      });

      e.target.reset();

      // Clear the overlay after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section className="relative py-24 bg-white dark:bg-zinc-950 transition-colors duration-700 overflow-hidden px-3.5 rounded-xl md:rounded-none">
      {/* Toastify Container - Needs to be present once in your layout */}
      <ToastContainer limit={3} />
      
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="relative z-10 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter"
          >
            GET IN <span className="text-red-600">TOUCH</span>
          </motion.h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about donation or partnerships? Our team is ready to
            support your lifesaving journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* Success Overlay with Framer Motion */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-[2.5rem]"
              >
                <div className="text-center p-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-2xl shadow-red-500/40"
                  >
                    <FaCheckCircle size={48} />
                  </motion.div>
                  <h3 className="text-4xl font-black dark:text-white tracking-tighter uppercase">Lifesaver Confirmed!</h3>
                  <p className="text-slate-500 dark:text-zinc-400 mt-3 font-medium">Your request has been beamed to our coordinators.</p>
                  <button 
                    onClick={() => setShowSuccess(false)}
                    className="mt-8 px-8 py-3 bg-slate-900 dark:bg-white dark:text-black text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                  >
                    Got it
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1. Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Email</label>
                  <input required type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Subject</label>
                <input required type="text" placeholder="General Inquiry" className="w-full px-6 py-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Your Message</label>
                <textarea required rows="4" placeholder="How can we help you today?" className="w-full px-6 py-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white resize-none" />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="group w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "TRANSMITTING..." : "Send Message"}
                <FaPaperPlane className={`${isSubmitting ? 'animate-bounce' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
              </button>
            </form>
          </motion.div>

          {/* 2. Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-linear-to-br from-red-600 via-rose-600 to-red-700 p-10 rounded-[2.5rem] text-white shadow-2xl flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-12">Contact <br /> Headquarters</h3>
              <div className="space-y-12">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30"><FaPhoneAlt size={22} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Direct Line</p>
                    <a href="tel:+1234567890" className="text-xl font-bold hover:underline tracking-tight">+1 (234) 567-890</a>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30"><FaEnvelope size={22} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Electronic Mail</p>
                    <a href="mailto:support@bloodlink.com" className="text-xl font-bold hover:underline tracking-tight">hello@bloodlink.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30"><FaMapMarkerAlt size={22} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">HQ Location</p>
                    <p className="text-xl font-bold tracking-tight leading-tight">123 Donor Avenue,<br />Blood City, TX 77001</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ContactUsSection;

// import React from "react";
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // React Icons for contact info
// import Container from "../../../Components/Container/Container"; // Assuming this provides max-width/padding

// const ContactUsSection = () => {
//   return (
//     <div className=" bg-white">
//       <Container>
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
//             Get In <span className="text-red-600">Touch</span>
//           </h2>
//           <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
//             We are here to answer your questions about blood donation,
//             partnerships, and support.
//           </p>
//         </div>

//         {/* Contact Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* 1. Contact Form */}
//           <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">
//               Send Us a Message
//             </h3>

//             <form className="space-y-4">
//               {/* Name Input */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   placeholder="Your Name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
//                   required
//                 />
//               </div>

//               {/* Email Input */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="name@example.com"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
//                   required
//                 />
//               </div>

//               {/* Subject Input */}
//               <div>
//                 <label
//                   htmlFor="subject"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   placeholder="I have a question about..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
//                   required
//                 />
//               </div>

//               {/* Message Textarea */}
//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Your Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="4"
//                   placeholder="Type your message here..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
//                   required
//                 ></textarea>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* 2. Contact Information */}
//           <div className="p-8 lg:p-12 bg-red-600 text-white rounded-xl shadow-lg flex flex-col justify-center">
//             <h3 className="text-3xl font-extrabold mb-8">
//               Direct Contact Info
//             </h3>

//             <div className="space-y-8">
//               {/* Phone Number */}
//               <div className="flex items-start gap-4">
//                 <FaPhoneAlt className="w-6 h-6 mt-1 shrink-0" />
//                 <div>
//                   <p className="text-lg font-bold">Call Us</p>
//                   <a href="tel:+1234567890" className="text-xl hover:underline">
//                     +1 (234) 567-890
//                   </a>
//                   <p className="text-sm opacity-90">
//                     Mon - Fri, 9:00 AM - 5:00 PM
//                   </p>
//                 </div>
//               </div>

//               {/* Email Address */}
//               <div className="flex items-start gap-4">
//                 <FaEnvelope className="w-6 h-6 mt-1 shrink-0" />
//                 <div>
//                   <p className="text-lg font-bold">Email Us</p>
//                   <a
//                     href="mailto:support@bloodlink.com"
//                     className="text-xl hover:underline"
//                   >
//                     support@bloodlink.com
//                   </a>
//                   <p className="text-sm opacity-90">
//                     We typically respond within 24 hours.
//                   </p>
//                 </div>
//               </div>

//               {/* Address */}
//               <div className="flex items-start gap-4">
//                 <FaMapMarkerAlt className="w-6 h-6 mt-1 shrink-0" />
//                 <div>
//                   <p className="text-lg font-bold">Our Headquarters</p>
//                   <p className="text-xl">123 Donor Avenue, Suite 400</p>
//                   <p className="text-xl">Blood City, TX 77001</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default ContactUsSection;
