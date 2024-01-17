import { Breadcrumbs, Typography } from "@mui/material";

import { useLocation } from "react-router-dom";

const AppBreadCrumbs = () => {
  const location = useLocation();
  const itemsList = location.pathname.split("/").filter((path) => path !== "");
  // console.log(itemsList);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* <Typography color="text.primary">ERPLY</Typography> */}
      {itemsList.length === 0 && (
        <Typography
          color="text.primary"
          fontSize={"1.2em"}
          fontWeight={"medium"}
        >
          Dashboard
        </Typography>
      )}

      {itemsList?.map((item, index) => (
        <Typography
          color="text.primary"
          fontSize={"1.2em"}
          fontWeight={"medium"}
          key={index}
        >
          {item === "erply"
            ? "Dashboard"
            : item[0].toUpperCase() + item.slice(1, item.length)}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default AppBreadCrumbs;
