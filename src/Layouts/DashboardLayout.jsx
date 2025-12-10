import { FaHome, FaTint } from "react-icons/fa";
import { GiBlood } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { FaHandHoldingMedical } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import Logo from "../Components/Shared/Logo";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res?.data[0];
    },
    enabled: !!user?.email,
  });

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 relative">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <TbLayoutSidebarLeftExpandFilled size={16} />
            </label>
            <Link to={'/'} className="px-4">
              <Logo />
            </Link>
          </nav>
          <h1></h1>
          {/* Page content here */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/*HOME*/}
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <FaTint size={20} className=" animate-pulse text-red-600" />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* Profile*/}
              <li>
                <NavLink
                  to={"/dashboard/profile"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My-Profile"
                >
                  {/*icon */}
                  <ImProfile size={18} />
                  <span className="is-drawer-close:hidden">My Profile</span>
                </NavLink>
              </li>

              {/* Donar Dashboard Link start  */}
              {userData?.role === "donor" && (
                <>
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Donor-Home-Information"
                    >
                      {/*icon */}
                      <FaHome size={20} />
                      <span className="is-drawer-close:hidden">Donar Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/create-donation-request"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Donor Create Donation Request"
                    >
                      {/*icon */}
                      <FaHandHoldingMedical size={20} />
                      <span className="is-drawer-close:hidden">
                        Create Donation Request
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Donar Dashboard Link end  */}

              {/* Admin Dashboard Link start  */}
              {userData?.role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Admin-Home-Information"
                    >
                      <FaHome size={20} />
                      <span className="is-drawer-close:hidden">Admin Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/all-users"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="All Users"
                    >
                      <FaUsers size={20} />
                      <span className="is-drawer-close:hidden">All Users</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/all-blood-donation-request"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="All BloodDonation Request"
                    >
                      <GiBlood size={20} className="text-red-500" />
                      <span className="is-drawer-close:hidden">
                        All BloodDonation Request
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {/* Admin Dashboard Link end  */}
              {userData?.role === "volunteer" && (
                <>
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Home (Volunteer )"
                    >
                      <FaHome size={20} />
                      <span className="is-drawer-close:hidden">Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/all-blood-donation-request"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="All BloodDonation Request (Volunteer)"
                    >
                      <GiBlood size={20} className="text-red-500" />
                      <span className="is-drawer-close:hidden">
                        All BloodDonation Request
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
