import { FaBox } from "react-icons/fa";
import { FiHome, FiSettings } from "react-icons/fi";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router";


const DashboardLayout = () => {
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
            <div className="px-4">Navbar Title</div>
          </nav>
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
              {/* List item 1*/}
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <FiHome size={18} />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* List item 2*/}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <FiSettings size={18} />
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>

              {/* List item 3*/}
              <li>
                <NavLink
                  to={'/dashboard/profile'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My-Profile"
                >
                  {/*icon */}
                  <FaBox size={17} />
                  <span className="is-drawer-close:hidden">My Profile</span>
                </NavLink>
              </li>

             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
