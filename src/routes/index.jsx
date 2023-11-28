import Dashboard from "../pages/dashboard";
import Orders from "../pages/orders";

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
