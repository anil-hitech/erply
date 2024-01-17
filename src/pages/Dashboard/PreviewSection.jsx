/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { PreviewDataField } from "./previewDataField";

const PreviewSection = ({ data, isLoading, filters, customersList }) => {
  const navigate = useNavigate();

  const previewData = PreviewDataField(data); //getting data from helper function

  const itemsKeys = Object.keys(previewData.byItem);
  const orderKeys = Object.keys(previewData.byOrder);

  const locationID = filters.locationID;
  const selectedCustomer = customersList.filter(
    (customer) => customer.fullName === filters?.customerID
  );
  const customerID = selectedCustomer[0]?.customerID ?? "";
  const from = filters.fromDate;
  const to = filters.toDate;

  const LoaderSpinner = () => <CircularProgress size="1rem" />;

  return (
    <Box
      sx={{
        width: "70%",
        alignSelf: "center",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      <Box>
        <Typography fontWeight={"bold"} mb={"10px"}>
          By Line Items
        </Typography>
        <Grid container columnSpacing={2} rowSpacing={3}>
          {itemsKeys.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Box
                sx={{
                  justifySelf: "center",
                  border: "1px solid silver",
                  borderRadius: "10px",
                  width: "100%",
                  height: "90px",
                  padding: "20px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(
                    `/orders?type1=lineItem&type2=${previewData.byItem[item].name}&locationID=${locationID}&customerID=${customerID}&from=${from}&to=${to}`
                  )
                }
              >
                <Typography color={"grey"}>
                  {previewData.byItem[item].label}
                </Typography>
                <Typography variant="h5">
                  {isLoading ? (
                    <LoaderSpinner />
                  ) : (
                    previewData.byItem[item].value || "---"
                  )}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Typography fontWeight={"bold"} mb={"10px"}>
          By Orders
        </Typography>
        <Grid container columnSpacing={2} rowSpacing={3}>
          {orderKeys.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Box
                sx={{
                  justifySelf: "center",
                  border: "1px solid silver",
                  borderRadius: "10px",
                  width: "100%",
                  height: "90px",
                  padding: "20px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(
                    `/orders?type1=order&type2=${previewData.byOrder[item].name}&locationID=${locationID}&customerID=${customerID}&from=${from}&to=${to}`
                  )
                }
              >
                <Typography color={"grey"}>
                  {previewData.byOrder[item].label}
                </Typography>
                <Typography variant="h5">
                  {isLoading ? (
                    <LoaderSpinner />
                  ) : (
                    previewData.byOrder[item].value || "---"
                  )}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PreviewSection;
