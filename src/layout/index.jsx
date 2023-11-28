import React from "react";
import { Outlet } from "react-router-dom";
import AppDrawer from "../components/drawer";

const Layout = () => {
  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
