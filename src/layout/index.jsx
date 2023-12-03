import React from "react";
import AppDrawer from "../components/AppDrawer";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [params] = useSearchParams();

  // params.has("sessionKey") &&
  //   localStorage?.setItem(
  //     "clientDetail",
  //     JSON.stringify({
  //       clientCode: params?.get("clientCode"),
  //       sessionKey: params?.get("sessionKey"),
  //     })
  //   );

  localStorage?.setItem(
    "clientDetail",
    JSON.stringify({
      clientCode: "606950",
      sessionKey: "038b36e0405fed269d59302f93308b204b0a2a8f77ed",
    })
  );
  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
