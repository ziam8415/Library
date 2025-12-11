import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FiUser,
  FiBook,
  FiUsers,
  FiList,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [collapse, setCollapse] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // mobile sidebar state

  const menus = [
    { name: "My Orders", to: "my-orders", icon: <FiList size={20} /> },
    { name: "My Profile", to: "profile", icon: <FiUser size={20} /> },
    { name: "Invoices", to: "invoices", icon: <FiFileText size={20} /> },
    { name: "Add Book", to: "add-book", icon: <FiBook size={20} /> },
    { name: "My Books", to: "my-books", icon: <FiBook size={20} /> },
    { name: "Orders", to: "orders", icon: <FiList size={20} /> },
    { name: "All Users", to: "all-users", icon: <FiUsers size={20} /> },
    { name: "Manage Books", to: "manage-books", icon: <FiBook size={20} /> },
  ];

  const sidebarWidth = collapse ? "w-16" : "w-64";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* ------------- MOBILE OVERLAY ------------- */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* ------------- SIDEBAR ------------- */}
      <div
        className={`
          fixed lg:static z-40 top-0 left-0 h-full bg-gray-900 text-white flex flex-col 
          transition-all duration-300 no-scrollbar overflow-y-auto
          ${sidebarWidth}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center justify-center py-4 border-b border-gray-800">
            {!collapse ? (
              <h1 className="text-xl font-bold tracking-wide">📚 Library</h1>
            ) : (
              <span className="text-2xl">📚</span>
            )}
          </div>
        </Link>

        {/* Collapse toggle (desktop only) */}
        <button
          className="bg-gray-700 px-3 py-2 rounded mx-2 mt-3 hidden lg:block"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? ">" : "<"}
        </button>

        {/* Sidebar Menu */}
        <ul className="space-y-2 mt-4 flex-1 px-2">
          {menus.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded transition 
     ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`
                }
                onClick={() => setMobileOpen(false)} // close on mobile
              >
                {item.icon}
                {!collapse && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={logOut}
            className="flex items-center gap-3 w-full p-2 hover:bg-red-600 bg-red-500 rounded text-white"
          >
            <FiLogOut size={20} />
            {!collapse && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* ------------- MAIN CONTENT AREA ------------- */}
      <div className="flex-1 h-full overflow-y-auto p-6">
        {/* Mobile menu button */}
        <button
          className="lg:hidden bg-gray-900 text-white px-4 py-2 rounded mb-4"
          onClick={() => setMobileOpen(true)}
        >
          Menu
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
