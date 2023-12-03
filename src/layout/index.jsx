import React from "react";
import AppDrawer from "../components/AppDrawer";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [params] = useSearchParams();
  const clientDetail =
    JSON?.parse(localStorage?.getItem("clientDetail")) || null;

  params.has("sessionKey") &&
    localStorage?.setItem(
      "clientDetail",
      JSON.stringify({
        clientCode: params?.get("clientCode"),
        sessionKey: params?.get("sessionKey"),
        // clientCode: "606950",
        // sessionKey: "ad364a169cdfacb7de7ecb3fbe8fee1a7555692433f0",
      })
    );

  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
