import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import PropTypes from "prop-types";

const FilterContext = createContext();

const initialFilters = {
  customerID: "",
  locationID: "",
  fromDate: "",
  toDate: "",
};

const initialSummaryDetails = {
  orderNotOnOrder: "",
  orderOnPO: "",
  itemNotOnOrder: "",
  itemOnPO: "",
  orderOpen: "",
  itemOpen: "",
  orderOnHold: "",
  itemOnHold: "",
  orderOnVA: "",
  itemOnVA: "",
  itemOnEmb: "",
  orderOnEmb: "",
};

const FilterContextProvider = ({ children }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [locations, setLocations] = useState([]);
  const [summaryDetails, setSummaryDetails] = useState(initialSummaryDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState();

  const clientDetail = JSON.parse(localStorage.getItem("clientDetail"));

  //fetching summary_data for dashboard
  const getSummaryData = async () => {
    const from = filters.fromDate;
    const to = filters.toDate;
    setIsLoading(true);
    await api
      .get(
        `orderReportSummary.php?clientCode=${clientDetail?.clientCode}&sessionKey=${clientDetail?.sessionKey}&locationID=${filters.locationID}&customerID=${filters.customerID}&from=${from}&to=${to}`
      )
      .then((res) => {
        setSummaryDetails(res.data);
        setLocations(res.data.location);
      })
      .catch();
    setIsLoading(false);
  };

  useEffect(() => {
    clearInterval(timer);
    getSummaryData();
    const newInterval = setInterval(() => getSummaryData(), 3 * 60 * 1000);
    setInterval(newInterval);
    setTimer(newInterval);
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        locations,
        filters,
        setFilters,
        initialFilters,
        summaryDetails,
        setSummaryDetails,
        initialSummaryDetails,
        isLoading,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterContextProvider.propTypes = {
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilterContext = () => useContext(FilterContext);

export default FilterContextProvider;
