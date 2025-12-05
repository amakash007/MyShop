import React from "react";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-[5%] justify-between bg-white shadow-md">
      {/* Logo Section */}
      <div className="text-2xl font-bold">
        <span className="text-black">My</span>
        <span className="text-transparent bg-clip-text  bg-blue-600 ">
          Store
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-blue-700 active:scale-95"
      >
        LOG OUT
      </button>
    </div>
  );
};

export default Navbar;
