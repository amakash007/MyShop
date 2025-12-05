import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-gray-300 bg-gray-50">
      <div className="flex flex-col gap-5 pt-8 pl-[20%] text-sm font-medium">
        {/* Sidebar Items */}
        {[
          { to: "/add", icon: assets.add_icon, label: "Add Items" },
          { to: "/orders", icon: assets.order_icon, label: "Order Items" },
          { to: "/list", icon: assets.order_icon, label: "List Items" },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white hover:bg-gray-200 text-gray-700"
              }`
            }
          >
            <img src={item.icon} className="w-5 h-5 opacity-80" alt="" />
            <p className="hidden md:block">{item.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
