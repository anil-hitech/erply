import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import FilterSection from "./FilterSection";
import PreviewSection from "./PreviewSection";
import api from "../../api";

const initialFilters = {
  customerID: "",
  locationID: "",
};

const Dashboard = () => {
  const [reportSummary, setReportSummary] = useState([]);
  const [customersList, setCustomerList] = useState([]);
  const [locations, setLocations] = useState([]);

  const [summaryFilter, setSummaryFilter] = useState(initialFilters); //filters for summary data
  const [isLoading, setIsLoading] = useState(true);

  const clientDetail = localStorage.getItem("clientDetail");

  //fetching summary_data for dashboard
  const getSummaryData = async () => {
    await api
      .get(
        `orderReportSummary.php?clientCode=${clientDetail?.clientCode}&sessionKey=${clientDetail?.sessionKey}&locationID=${summaryFilter.locationID}&customerID=${summaryFilter.customerID}`
        // `orderReportSummary.php?clientCode=606950&sessionKey=dc568baf7e419a1da6a104438a65718555d48d2d8174&locationID=${summaryFilter.locationID}&customerID=${summaryFilter.customerID}`
      )
      .then((res) => setReportSummary(res.data));
    setIsLoading(false);
  };

  //fetching curstomer_list
  const getCustomerList = async () => {
    await api
      .post("proxy.php", {
        clientCode: clientDetail.clientCode, //606950 test code
        sessionKey: clientDetail.sessionKey,
        request: "getCustomers",
        recordsOnPage: 1000,
        getFields: "customerID,firstName,lastName,fullName",
        searchNameIncrementally: "ra",
      })
      .then((res) => setCustomerList(res.data.records));

    setIsLoading(false);
  };

  const getFilters = (filter) => setSummaryFilter(filter);
  const handleResetFilters = () => setSummaryFilter(initialFilters);

  useEffect(() => {
    getCustomerList();
    getSummaryData();
  }, []);

  useEffect(
    (prev) => {
      setLocations(reportSummary?.location);
      console.log(reportSummary);
    },
    [reportSummary]
  );

  useEffect(() => console.log("filter list", summaryFilter), [summaryFilter]);

  useEffect(() => console.log(customersList), [customersList]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "75px",
      }}
    >
      <FilterSection
        locations={locations}
        customers={customersList}
        getFilters={getFilters}
        handleFilter={getSummaryData}
        handleReset={() => handleResetFilters}
      />
      <PreviewSection data={reportSummary} />
    </Box>
  );
};

export default Dashboard;
