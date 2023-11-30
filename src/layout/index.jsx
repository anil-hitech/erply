import React from "react";
import AppDrawer from "../components/AppDrawer";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [params] = useSearchParams();
  localStorage.setItem("clientDetail", {
    clientCode: params.get("clientCode"),
    sessionKey: params.get("sessionKey"),
  });

  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
