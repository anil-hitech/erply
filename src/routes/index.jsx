import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/*",
    element: <Dashboard />,
  },
];
