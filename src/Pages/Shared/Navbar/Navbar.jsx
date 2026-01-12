import { useEffect, useState } from "react";
import Container from "../../../Components/Container/Container";
import { TfiMenuAlt } from "react-icons/tfi";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Shared/Logo";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiHome,
  FiSearch,
  FiHeart,
  FiDollarSign,
  FiPlusCircle,
  FiUser,
} from "react-icons/fi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signUserOut } = useAuth();
  const [clickProfile, setClickProfile] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const axiosSecure = useAxiosSecure();

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res?.data[0];
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl hover:text-red-600 ${
              isActive
                ? "text-red-600 bg-red-50"
                : "text-slate-500 hover:bg-slate-50"
            }`
          }
        >
          <FiHome size={14} strokeWidth={2.5} />
          <span>Home</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/donation-request-public"
          className={({ isActive }) =>
            `flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl hover:text-red-600 ${
              isActive
                ? "text-red-600 bg-red-50"
                : "text-slate-500 hover:bg-slate-50"
            }`
          }
        >
          <FiPlusCircle size={14} strokeWidth={2.5} />
          <span>Requests</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/search-page"
          className={({ isActive }) =>
            `flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl hover:text-red-600 ${
              isActive
                ? "text-red-600 bg-red-50"
                : "text-slate-500 hover:bg-slate-50"
            }`
          }
        >
          <FiSearch size={14} strokeWidth={2.5} />
          <span>Search</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/donate-blood"
          className={({ isActive }) =>
            `flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl hover:text-red-600 ${
              isActive
                ? "text-red-600 bg-red-50"
                : "text-slate-500 hover:bg-slate-50"
            }`
          }
        >
          <FiHeart size={14} strokeWidth={2.5} />
          <span>Donate</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/funding-page"
          className={({ isActive }) =>
            `flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all px-4 py-2 rounded-xl hover:text-red-600 ${
              isActive
                ? "text-red-600 bg-red-50"
                : "text-slate-500 hover:bg-slate-50"
            }`
          }
        >
          <FiDollarSign size={14} strokeWidth={2.5} />
          <span>Funding</span>
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    signUserOut()
      .then(() => {
        setClickProfile(false);
        toast.success("Sign Out Successful");
      })
      .catch(() => {});
  };

  return (
    <div
      className={`w-full z-50 transition-all ease-in-out duration-300 ${
        isScrolled
          ? "bg-black/10 backdrop-blur-md  text-orange-400 fixed top-0 left-0 "
          : "bg-gray-400 "
      }`}
    >
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <TfiMenuAlt size={26} />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-[200px] p-2 shadow space-y-1 font-medium"
              >
                {links}
              </ul>
            </div>

            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul
              className={`menu menu-horizontal px-1 font-semibold space-x-2.5 p-4${
                isScrolled ? "text-orange-500 p-3.5" : ""
              }`}
            >
              {links}
            </ul>
          </div>

          <div className="navbar-end gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`btn btn-ghost btn-circle hover:bg-white/10 transition-all ${
                isScrolled ? "text-orange-400" : "text-white"
              }`}
            >
              {theme === "light" ? (
                <HiOutlineMoon size={22} />
              ) : (
                <HiOutlineSun size={22} className="text-yellow-400" />
              )}
            </button>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {!user?.email ? (
                <Link
                  to="/login"
                  className="bg-slate-950 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-slate-200 active:scale-95"
                >
                  Initialize Login
                </Link>
              ) : (
                <div className="relative">
                  {/* Profile Trigger */}
                  <div
                    onClick={() => setClickProfile(!clickProfile)}
                    className="w-10 h-10 rounded-full border-2 border-red-600 p-0.5 cursor-pointer hover:scale-105 transition-all duration-300 shadow-md shadow-red-100"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                      {user?.photoURL ? (
                        <img
                          src={user?.photoURL}
                          alt="Profile"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <FiUser size={20} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {clickProfile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-72 bg-white rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-100 z-50 overflow-hidden"
                      >
                        {/* Red Accent Top Bar */}
                        <div className="h-1.5 bg-linear-to-r from-red-600 to-red-400 w-full" />

                        <div className="p-6">
                          {/* Identity Section */}
                          <div className="mb-4">
                            <p className="text-[9px] font-black text-red-600 uppercase tracking-[0.2em] mb-1">
                              Authenticated User
                            </p>
                            <h3 className="font-black text-slate-950 text-base leading-tight truncate">
                              {userData?.name || user?.displayName}
                            </h3>
                            <p className="text-[11px] font-bold text-slate-400 truncate mt-0.5">
                              {user?.email}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Link
                              to="/dashboard/profile"
                              onClick={() => setClickProfile(false)}
                              className="flex items-center justify-center w-full bg-slate-50 hover:bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-colors border border-slate-100"
                            >
                              Access Dashboard
                            </Link>

                            <button
                              onClick={() => {
                                handleLogout();
                                setClickProfile(false);
                              }}
                              className="w-full bg-red-50 hover:bg-red-600 hover:text-white text-red-600 text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-all"
                            >
                              Terminate Session
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
