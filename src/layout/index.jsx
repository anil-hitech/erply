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
  //     sessionKey: "6eef69dfe27c40dc26ca09d803d61d04f0cdbccbb45c",
  //   })
  // );
  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
