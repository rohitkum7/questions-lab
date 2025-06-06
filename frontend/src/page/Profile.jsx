import React from "react";
import { Home, User, Settings, LogOut } from "lucide-react"; // Optional: for icons
import { NavLink, Link } from "react-router-dom";
import { AccountInfo } from "../components/AccountInfo";
import { Dashboard } from "../components/Dashboard";
import LogoutButton from "../components/LogoutButton";
import { useAuthStore } from "../store/useAuthStore";

export const Profile = ({ profileData }) => {
  const { authUser } = useAuthStore();
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive ? "bg-primary text-white font-semibold" : "hover:bg-base-300"
    }`;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col items-center p-6">
        {/* Drawer Toggle Button on small screens */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Menu
        </label>

        <div className="text-center">
          {profileData === "account-info" ? <AccountInfo /> : <Dashboard />}
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="w-64 bg-base-200 text-base-content min-h-full">
          <div className="p-4 text-xl font-bold border-b border-base-300">
            {" "}
            <Link to="/home" className="flex justify-around">
              {" "}
              <Home />
              <span>Hi, {authUser?.name} 😊</span>
            </Link>
          </div>
          <ul className="menu p-4 w-48">
            <li>
              <NavLink to={"/profile/dashboard"} className={navLinkClass}>
                <Home size={18} />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/profile/account-info"} className={navLinkClass}>
                <User size={18} />
                Account Info
              </NavLink>
            </li>
            <li className="absolute bottom-10 w-48">
              <LogoutButton className="hover:bg-primary hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </LogoutButton>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};
