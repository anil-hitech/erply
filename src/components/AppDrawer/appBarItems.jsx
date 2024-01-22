import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const getByLineItems = (type2) => `/orders?type1=lineItem&type2=${type2}`;
const getByOrder = (type2) => `/orders?type1=order&type2=${type2}`;

const appBarItems = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
    active: true,
    expandable: false,
  },
  {
    name: "Orders",
    icon: <ShoppingCartIcon />,
    path: "/orders",
    active: false,
    expandable: undefined,
    childrens: [
      {
        label: "By Line Item",
        list: [
          { label: "Not on Order", link: getByLineItems("notOnOrder") },
          { label: "On Purchase Order", link: getByLineItems("onPO") },
          { label: "Open", link: getByLineItems("open") },
          { label: "On Hold", link: getByLineItems("onHold") },
          { label: "On Embroidery", link: getByLineItems("onEmb") },
        ],
      },
      {
        label: "By Order",
        list: [
          { label: "Not on Order", link: getByOrder("notOnOrder") },
          { label: "On Purchase Order", link: getByOrder("onPO") },
          { label: "Open", link: getByOrder("open") },
          { label: "On Hold", link: getByOrder("onHold") },
          { label: "On Embroidery", link: getByOrder("onEmb") },
        ],
      },
    ],
  },
];
export default appBarItems;
