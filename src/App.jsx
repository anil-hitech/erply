import "./App.css";
import { router } from "./routes/router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import FilterContextProvider from "./context/FilterContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FilterContextProvider>
        <RouterProvider router={router} />
      </FilterContextProvider>
    </ThemeProvider>
  );
}

export default App;
