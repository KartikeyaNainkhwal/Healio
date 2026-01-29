import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const linkStyle =
    "text-gray-700 hover:text-blue-600 transition font-medium";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={assets.logo}
            alt="Healio"
            className="w-10 h-10 object-contain"
          />
          <span className="text-lg font-semibold text-gray-900">Healio</span>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : linkStyle}>
            Home
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : linkStyle}>
            Doctors
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : linkStyle}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : linkStyle}>
            Contact
          </NavLink>
        </ul>

        <div className="flex items-center gap-4">
          {location.pathname === "/" && (
            <button
              onClick={() =>
                window.open("http://localhost:5174/admin-dashboard", "_blank")
              }
              className="hidden md:block text-sm px-4 py-2 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition"
            >
              Admin Panel
            </button>
          )}

          {token && userData ? (
            <div className="relative group cursor-pointer">
              <img
                src={userData.image || "/fallback-user.png"}
                className="w-9 h-9 rounded-full object-cover"
                alt=""
              />
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border hidden group-hover:block">
                <p
                  onClick={() => navigate("my-profile")}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-red-500"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-sm"
            >
              Get Started
            </button>
          )}

          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden"
            src={assets.menu_icon}
            alt=""
          />
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-white z-40  md:hidden transition-transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b">
          <span className="text-lg font-semibold">Healio</span>
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-7"
            alt=""
          />
        </div>

        <ul className="flex flex-col items-center gap-6 mt-10 text-lg">
          {["/", "/doctors", "/about", "/contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={() => setShowMenu(false)}
              className="hover:text-blue-600 transition"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </NavLink>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
