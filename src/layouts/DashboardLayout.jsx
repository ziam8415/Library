import { useState } from "react";
import { Link, Outlet } from "react-router";
import { AuthContext } from "../providers/AuthContext";

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
  const { user, logOut } = useAuth(); // logout from your context
  const [collapse, setCollapse] = useState(false);

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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          collapse ? "w-16" : "w-64"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo Section */}
        <Link to="/">
          {" "}
          <div className="flex items-center justify-center py-4">
            {!collapse ? (
              <h1 className="text-xl font-bold tracking-wide">📚 Library</h1>
            ) : (
              <span className="text-2xl">📚</span>
            )}
          </div>
        </Link>

        {/* Toggle Button */}
        <button
          className="bg-gray-700 px-3 py-2 rounded mx-2"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? ">" : "<"}
        </button>

        {/* Menu items */}
        <ul className="space-y-2 mt-4 flex-1">
          {menus.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
              >
                {item.icon}
                {!collapse && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button (sticks to the bottom) */}
        <Link to="/">
          {" "}
          <div className="p-3 border-t border-gray-800">
            <button
              onClick={logOut}
              className="flex items-center gap-3 w-full p-2 hover:bg-red-600 bg-red-500 rounded text-white"
            >
              <FiLogOut size={20} />
              {!collapse && <span>Logout</span>}
            </button>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
