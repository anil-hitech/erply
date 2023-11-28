import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AppBreadCrumbs = () => {
  const location = useLocation();
  const itemsList = location.pathname.split("/").filter((path) => path !== "");
  console.log(itemsList);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary">ERPLY</Typography>
      {itemsList.length === 0 && (
        <Typography color="text.primary">Dashboard</Typography>
      )}

      {itemsList?.map((item, index) =>
        index < itemsList.length - 1 ? (
          <Link key={index} underline="hover" color="inherit" to={`/${item}`}>
            {item}
          </Link>
        ) : (
          <Typography color="text.primary">{item}</Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default AppBreadCrumbs;
