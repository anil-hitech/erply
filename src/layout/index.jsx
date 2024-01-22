import AppDrawer from "../components/AppDrawer";
import { useSearchParams } from "react-router-dom";

const Layout = () => {
  const [params] = useSearchParams();

  if (window.location.hostname == "localhost") {
    localStorage?.setItem(
      "clientDetail",
      JSON.stringify({
        clientCode: "606950",
        sessionKey: "4723679fdb850534b03f409a5cdab4daebbeb7630bff",
      })
    );
  } else {
    params.has("sessionKey") &&
      localStorage?.setItem(
        "clientDetail",
        JSON.stringify({
          clientCode: params?.get("clientCode"),
          sessionKey: params?.get("sessionKey"),
        })
      );
  }

  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
