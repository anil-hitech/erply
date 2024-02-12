import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DrawerMui from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ExpandMore } from "@mui/icons-material";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import MailIcon from "@mui/icons-material/Mail";

import appBarItems from "./appBarItems";
import erplyLogo from "../../assets/erply.png";
import FilterSection from "../FilterSection";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
// import AppBreadCrumbs from "./AppBreadCrumbs";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AppDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  // console.log(location);
  const [appBarHeight, setAppBarHeight] = React.useState(0);

  const appBarRef = React.useRef(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useLayoutEffect(() => {
    const handleHeightResize = () => {
      setAppBarHeight(appBarRef.current.clientHeight);
    };

    handleHeightResize();
    window.addEventListener("resize", handleHeightResize);
    return () => removeEventListener("resize", handleHeightResize);
  }, [appBarRef]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "white" }}
        ref={appBarRef}
      >
        <Toolbar sx={{ height: "auto" }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              zIndex: 20,
              color: "black",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <AppBreadCrumbs /> */}
          <FilterSection />
        </Toolbar>
      </AppBar>
      <DrawerMui
        sx={{
          width: open ? drawerWidth : 0,
          transition: "width 0.3s",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h4" flexGrow={1} ml={"10px"}>
            <img src={erplyLogo} alt="E" />
            RPLY
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ p: "0px" }}>
          {appBarItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Accordion sx={{ width: "100%" }} expanded={item.expandable}>
                <ListItemButton
                  onClick={() =>
                    item.expandable === false && navigate(item.path)
                  }
                  sx={{ p: "5px", borderRadius: "5px", height: "45px" }}
                  selected={
                    item.path === location.pathname ||
                    (item.name === "Dashboard" &&
                      location.pathname === "/erply/") //to select dashboard when route is "/erply/"
                  }
                >
                  <AccordionSummary
                    expandIcon={item.expandable !== false && <ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      px: "3px",
                      marginTop: "0",
                      marginBottom: "0",
                      width: "100%",
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </AccordionSummary>
                </ListItemButton>
                <AccordionDetails sx={{ p: "2px" }}>
                  <Box
                    sx={{
                      pl: "30px",
                      fontSize: "1em",
                      backgroundColor: "ghostWhite",
                      border: "1px solid transparent",
                      borderRadius: "2px",
                    }}
                  >
                    {item.childrens &&
                      item.childrens.map((child, index) => (
                        <Box key={index}>
                          <Typography fontWeight={"bold"} fontSize="0.95em">
                            {child.label}
                          </Typography>
                          <ul
                            style={{
                              cursor: "pointer",
                              listStyle: "square",
                              marginBottom: "10px",
                              color: "black",
                            }}
                          >
                            {child?.list.map((subItem, i) => (
                              <ListItemButton
                                key={i}
                                onClick={() => navigate(subItem.link)}
                                sx={{
                                  textDecoration: "none",
                                  listStyleType: "none",
                                  py: "2px",
                                  color: "DarkSlateGray",
                                  borderRadius: "3px",
                                  fontSize: "0.95em",
                                  marginRight: "5px",
                                }}
                                selected={
                                  subItem.link ===
                                  location.pathname + location.search
                                }
                              >
                                <li>{subItem.label}</li>
                              </ListItemButton>
                            ))}
                          </ul>
                        </Box>
                      ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>

        {/* <Divider />
        <List>
          {["Terms & Condition"].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <ReceiptLongIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </DrawerMui>
      <Main open={open} sx={{ padding: 0, margin: "20px" }}>
        <DrawerHeader
          sx={{
            height: appBarHeight,
          }}
        />
        {/* <FilterSection /> */}
        <Outlet />
      </Main>
    </Box>
  );
}
