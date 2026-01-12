import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaArrowUp,
  FaPaperPlane,
  FaLinkedinIn,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../../Components/Container/Container";
import Logo from "../../../Components/Shared/Logo";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Footer = () => {
  const { user } = useAuth();
  const [showScroll, setShowScroll] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Handle Scroll to Top Visibility
  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  // TODO when i am in the another page it do not get me in contact section,it bring me in home page,have to fixed it.
  const handleContact = () => {
    const element = document.getElementById("contact-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-gray-300 relative overflow-hidden p-2.5">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-100 bg-red-600 text-white p-4 rounded-2xl shadow-2xl shadow-red-900/40 hover:bg-red-700 transition-all active:scale-90"
          >
            <FaArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <Container>
        <footer className="pt-20 pb-10 flex flex-col gap-16">
          {/* Top Branding Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            <div className="flex items-center gap-6">
              <div className="bg-white p-2 rounded-2xl">
                <Logo />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                  Blood<span className="text-red-600">Link</span>
                </h2>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  The Impact Circle Network
                </p>
              </div>
            </div>

            {/* Social Matrix */}
            <div className="flex gap-4">
              {[
                { icon: <FaGithub />, link: "https://github.com/RahidulRIP" },
                { icon: <FaXTwitter />, link: "https://x.com/RahidulIsalm" },
                {
                  icon: <FaLinkedinIn />,
                  link: "https://www.linkedin.com/in/rahidul-islam-pritom/",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-white/5 py-16">
            <div>
              <h6 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">
                Services
              </h6>
              <div className="flex flex-col gap-4 text-sm font-medium">
                <Link
                  to={"/search-page"}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Find a Donor
                </Link>
                <Link
                  to={"dashboard/create-donation-request"}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Request Blood
                </Link>
                {!user && (
                  <Link
                    to={"/register"}
                    className="hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Registration
                  </Link>
                )}
              </div>
            </div>

            <div>
              <h6 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">
                Company
              </h6>
              <div className="flex flex-col gap-4 text-sm font-medium">
                <Link
                  to={"/about-us"}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  About us
                </Link>

                <Link
                  to={""}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                  onClick={handleContact}
                >
                  Contact Us
                </Link>
                <Link
                  to={"/donation-request-public"}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  LifeStream
                </Link>
              </div>
            </div>

            <div>
              <h6 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">
                Legal
              </h6>
              <div className="flex flex-col gap-4 text-sm font-medium">
                <Link
                  to={"/terms-use"}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Terms of use
                </Link>
                <Link
                  to={"/privacy-policy"}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Privacy policy
                </Link>
                <Link
                  to={"/cookie-policy"}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                >
                  Cookie policy
                </Link>
              </div>
            </div>

            {/* Subscription Box */}
            <div className="col-span-2 md:col-span-1">
              <h6 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">
                Join the Circle
              </h6>
              <p className="text-sm text-gray-500 mb-6 font-medium">
                Monthly updates on lives saved and urgent needs.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="relative flex items-center"
              >
                <input
                  required
                  type="email"
                  placeholder="email@address.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-red-600 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 bg-red-600 p-3 rounded-xl hover:bg-white hover:text-red-600 transition-all"
                >
                  <FaPaperPlane size={14} />
                </button>
              </form>
              <AnimatePresence>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-500 text-[10px] font-black uppercase mt-3 tracking-widest"
                  >
                    Successfully Subscribed!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
              © {new Date().getFullYear()} BloodLink — Developed by Rahidul
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-600">
              <span className="hover:text-white cursor-pointer transition-colors">
                Server Status: Optimal
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Emergency Protocol: Active
              </span>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
