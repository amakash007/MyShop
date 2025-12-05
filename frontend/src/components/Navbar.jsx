import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      {/* Logo */}
      <Link to={"/"} className="text-3xl font-bold flex items-center gap-2">
        <p className="text-black">My</p>
        <span className="text-blue-600">Store</span>
      </Link>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden sm:flex gap-6 text-sm font-medium">
        {[
          { to: "/", label: "HOME" },
          { to: "/collection", label: "COLLECTION" },
          { to: "/about", label: "ABOUT" },
          { to: "/contact", label: "CONTACT" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative px-2 py-1 transition duration-300 hover:text-blue-700 ${
                isActive ? "border-b-2 border-blue-700" : ""
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </ul>

      {/* Icons Section */}
      <div className="flex items-center gap-5">
        {/* Search Icon */}
        <img
          src={assets.search_icon}
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer hover:opacity-80"
          alt="search"
        />

        {/* Profile Dropdown */}
        <div className="relative group">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-6 cursor-pointer hover:opacity-80"
            alt="profile"
          />
          {token && (
            <div className="absolute hidden group-hover:block right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg py-3 px-4 transition-all duration-300">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p
                onClick={() => navigate("/orders")}
                className="cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <p onClick={logout} className="cursor-pointer hover:text-black">
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Cart Icon with Badge */}
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} className="w-6" alt="cart" />
          <p className="absolute -right-2 -bottom-2 w-4 h-4 flex items-center justify-center bg-blue-500 text-white rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-6 cursor-pointer sm:hidden transition-transform transform hover:scale-110"
          alt="menu"
        />
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0 w-3/4 sm:w-1/2" : "translate-x-full w-0"
        }`}
      >
        <div className="p-5 flex flex-col h-full z-10 ">
          {/* Close Button */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 cursor-pointer text-gray-800 hover:text-black py-2 px-3 rounded-md transition-all duration-200"
          >
            <img
              src={assets.dropdown_icon}
              className="h-5 rotate-180"
              alt="back"
            />
            <p className="font-semibold">Close</p>
          </div>

          {/* Sidebar Links */}
          <ul className="mt-6 space-y-4">
            {[
              { to: "/", label: "HOME" },
              { to: "/collection", label: "COLLECTION" },
              { to: "/about", label: "ABOUT" },
              { to: "/contact", label: "CONTACT" },
            ].map((item) => (
              <NavLink
                key={item.to}
                onClick={() => setVisible(false)}
                to={item.to}
                className="block py-2 px-4 rounded-md text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              >
                {item.label}
              </NavLink>
            ))}
          </ul>

          {/* Logout Button (Only if logged in) */}
          {token && (
            <div className="mt-auto p-4">
              <button
                onClick={logout}
                className="w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
