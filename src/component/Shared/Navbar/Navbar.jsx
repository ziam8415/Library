import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import avatarImg from "../../../assets/placeholder.jpg";
import { ThemeContext } from "../../../providers/ThemeProvider";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        !menuRef.current?.contains(e.target) &&
        !profileRef.current?.contains(e.target)
      ) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className={`fixed w-full z-50 ${
        theme === "dark" ? "bg-gray-900/80" : "bg-white/80"
      } backdrop-blur shadow-sm`}
    >
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="text-xl font-bold tracking-wide">
            📚 Library
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/books" className="hover:text-blue-600 transition">
              Books
            </Link>

            {user ? (
              // If logged in
              <div ref={profileRef} className="relative">
                <img
                  onClick={() => setProfileOpen(!profileOpen)}
                  src={user?.photoURL || avatarImg}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer hover:scale-105 transition"
                />

                {profileOpen && (
                  <div
                    className={`absolute right-0 mt-3 w-64 rounded-2xl shadow-lg ${
                      theme === "dark" ? "bg-gray-900/80" : "bg-white/70"
                    } p-4`}
                  >
                    <div className="flex items-center gap-3 border-b pb-3">
                      <img
                        src={user?.photoURL || avatarImg}
                        className="w-10 h-10 rounded-full"
                        alt=""
                      />
                      <div>
                        <p className="font-semibold text-sm">
                          {user?.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Theme
                        {theme === "light" ? <BsMoon /> : <BsSun />}
                      </button>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={logOut}
                        className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // If not logged in
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU */}
          <div ref={menuRef} className="md:hidden relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <AiOutlineMenu size={22} />
            </button>

            {menuOpen && (
              <div
                className={`absolute right-0 mt-3 w-[85vw] rounded-3xl ${
                  theme === "dark" ? "bg-gray-900/99" : "bg-white/70"
                } shadow-xl p-6`}
              >
                <div className="space-y-4 font-medium">
                  <button
                    onClick={() => {
                      toggleTheme();
                      setMenuOpen(false);
                    }}
                    className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    Theme
                    {theme === "light" ? <BsMoon /> : <BsSun />}
                  </button>
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    Home
                  </Link>

                  <Link
                    to="/books"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    Books
                  </Link>

                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          logOut();
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition"
                      >
                        Login
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
