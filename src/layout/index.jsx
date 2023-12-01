import React from "react";
import AppDrawer from "../components/AppDrawer";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [params] = useSearchParams();
  localStorage?.setItem(
    "clientDetail",
    JSON.stringify({
      clientCode: params?.get("clientCode"),
      sessionKey: params?.get("sessionKey"),
      // clientCode: "606950",
      // sessionKey: "fcbeac150450adfe23c4b6c5ac5fe1f727b087e60cb2",
    })
  );

  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
