import { createTheme } from "@mui/material/styles";

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Change primary color
    },
    secondary: {
      main: "#dc004e", // Change secondary color
    },
    // Add more customizations as needed
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Change default font
  },
  // Other theme customizations

  mode: "dark",
});

export default theme;
