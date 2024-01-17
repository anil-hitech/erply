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
  //     sessionKey: "ceb0a6133298b8788184665788f00899f67e345d48c4",
  //   })
  // );
  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
