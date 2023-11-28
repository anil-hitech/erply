import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const appBarItems = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
  {
    name: "Orders",
    icon: <ShoppingCartIcon />,
    path: "/orders",
  },
];
export default appBarItems;
