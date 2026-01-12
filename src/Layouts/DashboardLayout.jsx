import {
  FaHome,
  FaTint,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa"; // Added FaSignOutAlt
import { GiBlood } from "react-icons/gi";
import { FaHandHoldingMedical, FaUsers } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { Link, NavLink, Outlet, useNavigate } from "react-router"; // Added useNavigate
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Logo from "../Components/Shared/Logo";
import { toast, ToastContainer } from "react-toastify"; // Added Toastify
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = () => {
  const { user, signUserOut } = useAuth(); // Destructured logOut
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // For redirecting after logout

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

  // --- Logout Function ---
  const handleLogOut = async () => {
    try {
      await signUserOut();
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: theme,
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res?.data[0];
    },
    enabled: !!user?.email,
  });

  return (
    <div className="flex h-screen overflow-hidden bg-base-100 font-sans">
      <ToastContainer />
      {/* --- Mobile Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={` bg-gray-400 border-r border-base-300 transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 lg:static 
          ${
            isSidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full lg:translate-x-0 lg:w-20 w-fit"
          }`}
      >
        <div className="flex justify-between items-center border-b border-base-300 min-h-16 px-4">
          <Link to={"/"} className="flex justify-center items-center grow">
            {isSidebarOpen ? (
              <Logo />
            ) : (
              <FaTint
                size={24}
                className="text-red-600 animate-pulse hidden lg:block"
              />
            )}
          </Link>
          <button
            className="lg:hidden btn btn-ghost btn-sm btn-square"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="menu p-3 space-y-2 overflow-y-auto grow custom-scrollbar w-fit">
          {/* Profile */}
          {user && (
            <li>
              <NavLink
                title="Profile"
                to={"/dashboard/profile"}
                onClick={() =>
                  window.innerWidth < 1024 && setIsSidebarOpen(false)
                }
              >
                <ImProfile
                  size={18}
                  className={!isSidebarOpen ? "lg:mx-auto" : ""}
                />
                {(isSidebarOpen || window.innerWidth < 1024) && (
                  <span className="font-bold uppercase tracking-tight text-xs">
                    Profile
                  </span>
                )}
              </NavLink>
            </li>
          )}

          {/* Donor Links */}
          {userData?.role === "donor" && (
            <>
              <li>
                <NavLink
                  title="Home"
                  to={"/dashboard"}
                  end
                  onClick={() =>
                    window.innerWidth < 1024 && setIsSidebarOpen(false)
                  }
                >
                  <FaHome
                    size={20}
                    className={!isSidebarOpen ? "lg:mx-auto" : ""}
                  />
                  {isSidebarOpen && (
                    <span className="font-bold uppercase tracking-tight text-xs">
                      Home
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  title="Create Request"
                  to={"/dashboard/create-donation-request"}
                  onClick={() =>
                    window.innerWidth < 1024 && setIsSidebarOpen(false)
                  }
                >
                  <FaHandHoldingMedical
                    size={20}
                    className={!isSidebarOpen ? "lg:mx-auto" : ""}
                  />
                  {isSidebarOpen && (
                    <span className="font-bold uppercase tracking-tight text-xs">
                      Create Request
                    </span>
                  )}
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Links */}
          {userData?.role === "admin" && (
            <>
              <li>
                <NavLink
                  title="Home"
                  to={"/dashboard"}
                  end
                  onClick={() =>
                    window.innerWidth < 1024 && setIsSidebarOpen(false)
                  }
                >
                  <FaHome
                    size={20}
                    className={!isSidebarOpen ? "lg:mx-auto" : ""}
                  />
                  {isSidebarOpen && (
                    <span className="font-bold uppercase tracking-tight text-xs">
                      Home
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  title=" All Users"
                  to={"/dashboard/all-users"}
                  onClick={() =>
                    window.innerWidth < 1024 && setIsSidebarOpen(false)
                  }
                >
                  <FaUsers
                    size={20}
                    className={!isSidebarOpen ? "lg:mx-auto" : ""}
                  />
                  {isSidebarOpen && (
                    <span className="font-bold uppercase tracking-tight text-xs">
                      All Users
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  title="All Blood Requests"
                  to={"/dashboard/all-blood-donation-request"}
                  onClick={() =>
                    window.innerWidth < 1024 && setIsSidebarOpen(false)
                  }
                >
                  <GiBlood
                    size={20}
                    className={
                      !isSidebarOpen
                        ? "lg:mx-auto text-red-500"
                        : "text-red-500"
                    }
                  />
                  {isSidebarOpen && (
                    <span className="font-bold uppercase tracking-tight text-xs whitespace-nowrap">
                      All Blood Requests
                    </span>
                  )}
                </NavLink>
              </li>
            </>
          )}

          {/* Volunteer Links */}
          {userData?.role === "volunteer" && (
            <>
              <li>
                <NavLink
                  title="Home"
                  to={"/dashboard"}
                  end
                  onClick={() =>
                    window.innerWidth < 1024 && setIsSidebarOpen(false)
                  }
                >
                  <FaHome
                    size={20}
                    className={!isSidebarOpen ? "lg:mx-auto" : ""}
                  />
                  {isSidebarOpen && (
                    <span className="font-bold uppercase tracking-tight text-xs">
                      Home
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  title="View Requests"
                  to={"/dashboard/all-blood-donation-request"}
                  onClick={() =>
                    window.innerWidth < 1024 && setIsSidebarOpen(false)
                  }
                >
                  <GiBlood
                    size={20}
                    className={
                      !isSidebarOpen
                        ? "lg:mx-auto text-red-500"
                        : "text-red-500"
                    }
                  />
                  {isSidebarOpen && (
                    <span className="font-bold uppercase tracking-tight text-xs">
                      View Requests
                    </span>
                  )}
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* --- Logout Section --- */}
        {user && (
          <div className="p-4 border-t border-base-300">
            <button
              onClick={handleLogOut}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold uppercase tracking-tight text-xs"
            >
              <FaSignOutAlt
                size={20}
                className={!isSidebarOpen ? "lg:mx-auto" : ""}
              />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        )}
      </aside>

      {/* --- Main Content Area --- */}
      <main className="grow flex flex-col h-screen overflow-hidden w-full">
        {/* Navbar */}
        <header className="navbar bg-gray-400 border-b border-base-100 px-4 md:px-6 min-h-16 shadow-sm">
          <div className="flex-1 gap-2 md:gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-ghost btn-square"
            >
              <FaBars size={18} />
            </button>
            <h1 className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-500">
              Control <span className="text-red-600">Panel</span>
            </h1>
          </div>

          <div className="flex-none gap-2">
            <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
              {theme === "light" ? (
                <FaMoon size={18} />
              ) : (
                <FaSun size={20} className="text-yellow-400" />
              )}
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="grow overflow-y-auto p-2.5 md:p-6 custom-scrollbar bg-base-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
