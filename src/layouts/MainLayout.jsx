import React, { useContext } from "react";
import Navbar from "../component/Shared/Navbar/Navbar";
import { ThemeContext } from "../providers/ThemeProvider";
import { Outlet } from "react-router";

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);
  console.log(theme);
  //const theme = "dark";
  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white  text-gray-900"
      }`}
    >
      <Navbar></Navbar>
      <div className={`pt-24 w-11/12  mx-auto min-h-[calc(100vh-68px)]`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
