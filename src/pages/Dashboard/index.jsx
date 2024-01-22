import { Box } from "@mui/material";
import PreviewSection from "./PreviewSection";
import { useFilterContext } from "../../context/FilterContext";

const Dashboard = () => {
  const { isLoading, filters, summaryDetails } = useFilterContext();

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        minWidth: "900px",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "75px",
      }}
    >
      <PreviewSection
        data={summaryDetails}
        isLoading={isLoading}
        filters={filters}
      />
    </Box>
  );
};

export default Dashboard;
