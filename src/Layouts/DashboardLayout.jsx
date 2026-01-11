import { FaHome, FaTint, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { GiBlood } from "react-icons/gi";
import { FaHandHoldingMedical, FaUsers } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { Link, NavLink, Outlet } from "react-router";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Logo from "../Components/Shared/Logo";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

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
      {/* --- Mobile Overlay --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`bg-gray-400 border-r border-base-300 transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 lg:static 
        ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"}`}
      >
        <div className="flex justify-between items-center border-b border-base-300 min-h-[64px] px-4">
          <Link to={"/"} className="flex justify-center items-center flex-grow">
            {isSidebarOpen ? (
              <Logo />
            ) : (
              <FaTint size={24} className="text-red-600 animate-pulse hidden lg:block" />
            )}
          </Link>
          {/* Close button for mobile */}
          <button 
            className="lg:hidden btn btn-ghost btn-sm btn-square"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="menu w-full p-3 space-y-2 overflow-y-auto flex-grow custom-scrollbar">
          {/* Profile */}
          <li>
            <NavLink title="Profile" to={"/dashboard/profile"} onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
              <ImProfile size={18} className={!isSidebarOpen ? "lg:mx-auto" : ""} />
              {(isSidebarOpen || window.innerWidth < 1024) && (
                <span className="font-bold uppercase tracking-tight text-xs">Profile</span>
              )}
            </NavLink>
          </li>

          {/* Donor Links */}
          {userData?.role === "donor" && (
            <>
              <div className={`divider opacity-20 ${!isSidebarOpen && "lg:hidden"}`}>DONOR</div>
              <li>
                <NavLink title="Home" to={"/dashboard"} end onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
                  <FaHome size={20} className={!isSidebarOpen ? "lg:mx-auto" : ""} />
                  {isSidebarOpen && <span className="font-bold uppercase tracking-tight text-xs">Home</span>}
                </NavLink>
              </li>
              <li>
                <NavLink title="Create Request" to={"/dashboard/create-donation-request"} onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
                  <FaHandHoldingMedical size={20} className={!isSidebarOpen ? "lg:mx-auto" : ""} />
                  {isSidebarOpen && <span className="font-bold uppercase tracking-tight text-xs">Create Request</span>}
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Links */}
          {userData?.role === "admin" && (
            <>
              <div className={`divider opacity-20 ${!isSidebarOpen && "lg:hidden"}`}>ADMIN</div>
              <li>
                <NavLink title="Home" to={"/dashboard"} end onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
                  <FaHome size={20} className={!isSidebarOpen ? "lg:mx-auto" : ""} />
                  {isSidebarOpen && <span className="font-bold uppercase tracking-tight text-xs">Home</span>}
                </NavLink>
              </li>
              <li>
                <NavLink title=" All Users" to={"/dashboard/all-users"} onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
                  <FaUsers size={20} className={!isSidebarOpen ? "lg:mx-auto" : ""} />
                  {isSidebarOpen && <span className="font-bold uppercase tracking-tight text-xs">All Users</span>}
                </NavLink>
              </li>
              <li>
                <NavLink title="All Blood Requests" to={"/dashboard/all-blood-donation-request"} onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
                  <GiBlood size={20} className={!isSidebarOpen ? "lg:mx-auto text-red-500" : "text-red-500"} />
                  {isSidebarOpen && <span className="font-bold uppercase tracking-tight text-xs whitespace-nowrap">All Blood Requests</span>}
                </NavLink>
              </li>
            </>
          )}

          {/* Volunteer Links */}
          {userData?.role === "volunteer" && (
            <>
              <div className={`divider opacity-20 ${!isSidebarOpen && "lg:hidden"}`}>VOLUNTEER</div>
              <li>
                <NavLink title="Home" to={"/dashboard"} end onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
                  <FaHome size={20} className={!isSidebarOpen ? "lg:mx-auto" : ""} />
                  {isSidebarOpen && <span className="font-bold uppercase tracking-tight text-xs">Home</span>}
                </NavLink>
              </li>
              <li>
                <NavLink title="View Requests" to={"/dashboard/all-blood-donation-request"} onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
                  <GiBlood size={20} className={!isSidebarOpen ? "lg:mx-auto text-red-500" : "text-red-500"} />
                  {isSidebarOpen && <span className="font-bold uppercase tracking-tight text-xs">View Requests</span>}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden w-full">
        {/* Navbar */}
        <header className="navbar bg-gray-400 border-b border-base-100 px-4 md:px-6 min-h-[64px] shadow-sm">
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
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={20} className="text-yellow-400" />}
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 custom-scrollbar bg-base-200/30">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

// import { FaHome, FaTint } from "react-icons/fa";
// import { GiBlood } from "react-icons/gi";
// import { FiHome } from "react-icons/fi";
// import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
// import { FaHandHoldingMedical } from "react-icons/fa";
// import { Link, NavLink, Outlet } from "react-router";
// import useAuth from "../hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { FaUsers } from "react-icons/fa6";
// import { ImProfile } from "react-icons/im";
// import Logo from "../Components/Shared/Logo";

// const DashboardLayout = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data: userData = {} } = useQuery({
//     queryKey: ["userData", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users?email=${user?.email}`);
//       return res?.data[0];
//     },
//     enabled: !!user?.email,
//   });

//   return (
//     <div>
//       <div className="drawer lg:drawer-open">
//         <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           {/* Navbar */}
//           <nav className="navbar w-full bg-base-300 relative">
//             <label
//               htmlFor="my-drawer-4"
//               aria-label="open sidebar"
//               className="btn btn-square btn-ghost"
//             >
//               <TbLayoutSidebarLeftExpandFilled size={16} />
//             </label>
//             <Link to={"/"} className="px-4">
//               <Logo />
//             </Link>
//           </nav>

//           {/* Page content here */}
//           <div className="p-4">
//             <Outlet />
//           </div>
//         </div>

//         <div className="drawer-side is-drawer-close:overflow-visible">
//           <label
//             htmlFor="my-drawer-4"
//             aria-label="close sidebar"
//             className="drawer-overlay"
//           ></label>
//           <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//             {/* Sidebar content here */}
//             <ul className="menu w-full grow space-y-2.5">
//               {/*HOME*/}
//               <li>
//                 <NavLink
//                   to={"/"}
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Homepage"
//                 >
//                   {/* Home icon */}
//                   <FaTint size={20} className=" animate-pulse text-red-600" />
//                   <span className="is-drawer-close:hidden">Homepage</span>
//                 </NavLink>
//               </li>

//               {/* Profile*/}
//               <li>
//                 <NavLink
//                   to={"/dashboard/profile"}
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Profile"
//                 >
//                   {/*icon */}
//                   <ImProfile size={18} />
//                   <span className="is-drawer-close:hidden">Profile</span>
//                 </NavLink>
//               </li>

//               {/* Donar Dashboard Link start  */}
//               {userData?.role === "donor" && (
//                 <>
//                   <li>
//                     <NavLink
//                       to={"/dashboard"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="Home-Information"
//                       end
//                     >
//                       {/*icon */}
//                       <FaHome size={20} />
//                       <span className="is-drawer-close:hidden">Home</span>
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to={"/dashboard/create-donation-request"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="Create Donation Request"
//                     >
//                       {/*icon */}
//                       <FaHandHoldingMedical size={20} />
//                       <span className="is-drawer-close:hidden">
//                         Create Donation Request
//                       </span>
//                     </NavLink>
//                   </li>
//                 </>
//               )}

//               {/* Donar Dashboard Link end  */}

//               {/* Admin Dashboard Link start  */}
//               {userData?.role === "admin" && (
//                 <>
//                   <li>
//                     <NavLink
//                       to={"/dashboard"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="Home-Information"
//                       end
//                     >
//                       <FaHome size={20} />
//                       <span className="is-drawer-close:hidden">Home</span>
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to={"/dashboard/all-users"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="All Users"
//                     >
//                       <FaUsers size={20} />
//                       <span className="is-drawer-close:hidden">All Users</span>
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to={"/dashboard/all-blood-donation-request"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="All BloodDonation Request"
//                     >
//                       <GiBlood size={20} className="text-red-500" />
//                       <span className="is-drawer-close:hidden">
//                         All BloodDonation Request
//                       </span>
//                     </NavLink>
//                   </li>
//                 </>
//               )}
//               {/* Admin Dashboard Link end  */}
//               {userData?.role === "volunteer" && (
//                 <>
//                   <li>
//                     <NavLink
//                       to={"/dashboard"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="Home"
//                       end
//                     >
//                       <FaHome size={20} />
//                       <span className="is-drawer-close:hidden">Home</span>
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to={"/dashboard/all-blood-donation-request"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="All BloodDonation Request (Volunteer)"
//                     >
//                       <GiBlood size={20} className="text-red-500" />
//                       <span className="is-drawer-close:hidden">
//                         All BloodDonation Request
//                       </span>
//                     </NavLink>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
