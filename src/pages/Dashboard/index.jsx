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

  const getFilters = (filter) => setSummaryFilter(filter);
  const handleResetFilters = () => setSummaryFilter(initialFilters);
  const [timer, setTimer] = useState(null); //to control api call on input change

  const [summaryFilter, setSummaryFilter] = useState(initialFilters); //filters for summary data
  const [isLoading, setIsLoading] = useState(true);

  const clientDetail = JSON.parse(localStorage.getItem("clientDetail"));

  //fetching summary_data for dashboard
  const getSummaryData = async () => {
    const selectedCustomer = customersList.filter(
      (customer) => customer.fullName === summaryFilter?.customerID
    );

    // console.log("selectedCustomer", selectedCustomer);
    await api
      .get(
        `orderReportSummary.php?clientCode=${
          clientDetail?.clientCode
        }&sessionKey=${clientDetail?.sessionKey}&locationID=${
          summaryFilter.locationID
        }&customerID=${selectedCustomer[0]?.customerID ?? ""}`
      )
      .then((res) => setReportSummary(res.data));
    setIsLoading(false);
  };

  //fetching curstomer_list
  const getCustomerList = async () => {
    await api
      .post("proxy.php", {
        clientCode: clientDetail.clientCode,
        sessionKey: clientDetail.sessionKey,
        request: "getCustomers",
        recordsOnPage: 1000,
        getFields: "customerID,firstName,lastName,fullName",
        searchNameIncrementally: summaryFilter?.customerID,
      })
      .then((res) => setCustomerList(res.data.records));

    setIsLoading(false);
  };

  useEffect(() => {
    getSummaryData();
    console.log(clientDetail);
  }, []);

  useEffect(() => {
    // getCustomerList();
    if (timer) clearTimeout(timer);

    if (summaryFilter?.customerID.length >= 2) {
      const newTimer = setTimeout(() => getCustomerList(), 500);
      setTimeout(newTimer);
      setTimer(newTimer);
    } else setCustomerList([]);
  }, [summaryFilter]);

  useEffect(() => {
    setLocations(reportSummary?.location);
    // console.log(reportSummary);
  }, [reportSummary]);

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
        handleFilter={() => getSummaryData()}
        handleReset={() => handleResetFilters}
      />
      <PreviewSection data={reportSummary} />
    </Box>
  );
};

export default Dashboard;
