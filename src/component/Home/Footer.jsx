import React from "react";
import { Github, Instagram, Linkedin, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200  ">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Title */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold  tracking-tight">
            📚 <span className="">Library</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">Reads more books.</p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.4l-5.204-6.817L5.16 21.75H1.848l7.73-8.838L1.39 2.25h6.045l4.713 6.231 6.096-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
            </svg>
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="flex flex-wrap justify-center  gap-4 text-sm text-gray-500">
        <a href="/terms" className="hover:text-gray-800 transition">
          Terms & Conditions
        </a>
        <a href="/privacy" className="hover:text-gray-800 transition">
          Privacy Policy
        </a>
        <a href="/contact" className="hover:text-gray-800 transition">
          Contact Us
        </a>
      </div>

      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} HabitFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
