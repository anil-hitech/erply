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
      sessionKey: "4cfd8bd906848e0a52dc3f3eb9cd5c8c7a10ec57d28f",
    })
  );
  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
