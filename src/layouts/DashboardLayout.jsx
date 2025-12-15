import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FiUser,
  FiBook,
  FiUsers,
  FiList,
  FiFileText,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { icon } from "leaflet";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [role, isRoleLoading] = useRole();

  const [collapse, setCollapse] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* -------------------- MENUS -------------------- */

  const commonMenus = [
    // { name: "My Profile", to: "profile", icon: <FiUser size={20} /> },
  ];

  const customerMenus = [
    { name: "My Orders", to: "my-orders", icon: <FiList size={20} /> },
    { name: "Invoices", to: "invoices", icon: <FiFileText size={20} /> },
    { name: "My Wishlist", to: "wish-list", icon: <FiFileText size={20} /> },
  ];

  const librarianMenus = [
    { name: "Add Book", to: "add-book", icon: <FiBook size={20} /> },
    { name: "My Books", to: "my-books", icon: <FiBook size={20} /> },
    { name: "Orders", to: "orders", icon: <FiList size={20} /> },
  ];

  const adminMenus = [
    { name: "All Users", to: "all-users", icon: <FiUsers size={20} /> },
    { name: "Manage Books", to: "manage-books", icon: <FiBook size={20} /> },
  ];

  let roleMenus = [];
  if (role === "customer") roleMenus = customerMenus;
  if (role === "librarian") roleMenus = librarianMenus;
  if (role === "admin") roleMenus = adminMenus;

  const menus = [...roleMenus, ...commonMenus];

  /* -------------------- LOADING -------------------- */
  if (isRoleLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <span className="text-gray-500 text-lg">Loading dashboard...</span>
      </div>
    );
  }

  const sidebarWidth = collapse ? "w-16" : "w-64";

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ---------------- MOBILE OVERLAY ---------------- */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full bg-gray-900 text-white flex flex-col
        transition-all duration-300
        ${sidebarWidth}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <Link to="/" className="border-b border-gray-800">
          <div className="flex items-center justify-center h-16">
            {!collapse ? (
              <h1 className="text-xl font-bold tracking-wide">📚 Library</h1>
            ) : (
              <span className="text-2xl">📚</span>
            )}
          </div>
        </Link>

        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={() => setCollapse(!collapse)}
          className="hidden lg:block bg-gray-800 mx-3 mt-3 py-2 rounded text-sm hover:bg-gray-700"
        >
          {collapse ? " → " : "← Collapse"}
        </button>

        {/* Menu */}
        <ul className="mt-4 flex-1 px-2 space-y-1">
          {menus.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                {!collapse && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* USER PROFILE (Bottom) */}
        <div className="border-t border-gray-800 p-3 space-y-3">
          {/* Profile Info */}
          <Link to="/dashboard">
            <div className="flex items-center gap-3 mb-1">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border"
              />

              {!collapse && (
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{user?.displayName}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              )}
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={logOut}
            className="flex items-center justify-center gap-3 w-full  px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
          >
            <FiLogOut size={20} />
            {!collapse && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Top Bar */}
        <div className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
          <button onClick={() => setMobileOpen(true)}>
            <FiMenu size={22} />
          </button>
          <span className="font-medium">Dashboard</span>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
