import React from "react";
import AppDrawer from "../components/AppDrawer";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [params] = useSearchParams();

  params.has("sessionKey") &&
    localStorage?.setItem(
      "clientDetail",
      JSON.stringify({
        clientCode: params?.get("clientCode"),
        sessionKey: params?.get("sessionKey"),
      })
    );

  // localStorage?.setItem(
  //   "clientDetail",
  //   JSON.stringify({
  //     clientCode: "606950",
  //     sessionKey: "0424948e5170be5cc2d023cf6badb0d6facb995b8756",
  //   })
  // );
  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
