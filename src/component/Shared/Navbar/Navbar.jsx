import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext, useState } from "react";
// Assuming 'react-router-dom' Link for standard web routing

import avatarImg from "../../../assets/placeholder.jpg";

import { ThemeContext } from "../../../providers/ThemeProvider";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  //console.log(theme);

  return (
    // ✨ CHANGE 1: Added dark:bg-gray-900 and default/dark text colors
    <div className={`fixed w-full z-10 shadow-sm`}>
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <img
                src="https://i.ibb.co.com/rGSZp7xP/download.jpg"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>

            {/* MAIN NAV LINKS (visible on md & lg screens) */}
            <div className="hidden md:flex items-center gap-8 text-[16px] font-medium">
              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>
              <Link to="/books" className="hover:text-blue-600 transition">
                Books
              </Link>
              <button
                onClick={toggleTheme}
                // Border/Hover colors are already set for dark mode, which is great
                className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
              </button>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="hover:text-blue-600 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logOut}
                    className="hover:text-red-500 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-600 transition">
                    Login
                  </Link>
                  <Link to="/signup" className="hover:text-blue-600 transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON & DROPDOWN */}
            <div className="relative md:hidden">
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                </div>
              </div>

              {/* Mobile Dropdown */}
              {isOpen && (
                // ✨ CHANGE 2: Added dark:bg-gray-800 to the mobile menu
                <div className="absolute pl-5 rounded-xl shadow-md w-[40vw] bg-white dark:bg-gray-800 overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {/* MOBILE ROUTES - Apply dark:hover:bg-gray-700 to all */}
                    <Link
                      to="/"
                      // ✨ CHANGE 3: Added dark:hover:bg-gray-700
                      className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                    >
                      Home
                    </Link>
                    <Link
                      to="/books"
                      // ✨ CHANGE 3: Added dark:hover:bg-gray-700
                      className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                    >
                      Books
                    </Link>
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      {/* You might want to adjust the button container style for mobile to fit better */}
                      {theme === "light" ? (
                        <BsMoon size={20} />
                      ) : (
                        <BsSun size={20} />
                      )}
                    </button>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          // ✨ CHANGE 3: Added dark:hover:bg-gray-700
                          className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          // ✨ CHANGE 3: Added dark:hover:bg-gray-700
                          className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          // ✨ CHANGE 3: Added dark:hover:bg-gray-700
                          className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          // ✨ CHANGE 3: Added dark:hover:bg-gray-700
                          className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* DESKTOP AVATAR (Border color might need adjustment) */}
            <div className="hidden md:flex items-center">
              <img
                // Added dark:border-gray-700 for better visibility in dark mode
                className="rounded-full border border-gray-200 dark:border-gray-700 p-1"
                src={user?.photoURL ?? avatarImg}
                alt="profile"
                width="40"
                height="40"
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
