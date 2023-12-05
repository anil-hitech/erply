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
  //     sessionKey: "4f3a7e952d40428fef74d764008c25c7d1f3623ec046",
  //   })
  // );
  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
