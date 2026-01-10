import { useEffect, useState } from "react";
import Container from "../../../Components/Container/Container";
import { TfiMenuAlt } from "react-icons/tfi";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Shared/Logo";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signUserOut } = useAuth();
  const [clickProfile, setClickProfile] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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
        <NavLink to={"/"}>HOME</NavLink>
      </li>
      <li>
        <NavLink to={"/donation-request-public"}>DONATION REQUEST</NavLink>
      </li>

      <li>
        <NavLink to={"/search-page"}>SEARCH PAGE</NavLink>
      </li>
      <li>
        <NavLink to={"/donate-blood"}>DONATE BLOOD</NavLink>
      </li>
      <li>
        <NavLink to={"/funding-page"}>FUNDING</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    signUserOut()
      .then(() => {
        setClickProfile(false);
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

            {user?.email ? (
              ""
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn text-lg bg-primary hover:text-white hover:bg-gray-500"
                >
                  Login
                </Link>
              </>
            )}
            {user?.email && (
              <div className="relative">
                <div
                  onClick={() => setClickProfile(!clickProfile)}
                  className="w-11 h-11 rounded-full border-2 border-primary cursor-pointer overflow-hidden hover:scale-105 transition-transform"
                >
                  {user?.photoURL && (
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {user && clickProfile && (
                  <div className="absolute right-0 mt-3 w-fit bg-base-200 rounded-xl shadow-lg border border-base-300 z-50 animate-fadeIn">
                    <div className="p-4 space-y-2 w-64">
                      <h3 className="font-semibold text-base text-teal-700">
                        {user?.displayName}
                      </h3>
                      <h3 className=" text-base font-medium">{user?.email}</h3>
                      <h3>
                        <Link to={"/dashboard"} className="btn btn-dash w-full">
                          DashBoard
                        </Link>
                      </h3>
                      <hr className="border-base-300" />
                      <button onClick={handleLogout} className="btn_primary">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
