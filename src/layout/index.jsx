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
      // sessionKey: "690dfb7ed8157d10ea461544f7d2310af0662ad4b919",
    })
  );

  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
