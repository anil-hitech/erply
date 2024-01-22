/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import uniqid from "uniqid";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateBox } from "devextreme-react";

import { useFilterContext } from "../../context/FilterContext";
import formatDate from "../../utilities/formatDate";
import api from "../../api";

const FilterSection = () => {
  const { locations, filters, setFilters, initialFilters } = useFilterContext();
  const [localFilters, setLocalFilters] = useState(filters);

  const [customerSearchText, setCustomerSearchText] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [timer, setTimer] = useState(null); //to control api call on input change

  const clientDetail = JSON.parse(localStorage.getItem("clientDetail"));

  //handle Customer onSelect
  const handleCustomerSelect = (e, selectedCustomer) => {
    if (selectedCustomer !== null) {
      setLocalFilters((prev) => ({
        ...prev,
        customerID: selectedCustomer.customerID,
      }));
      setCustomerSearchText(selectedCustomer.fullName);
    } else {
      setLocalFilters((prev) => ({
        ...prev,
        customerID: "",
      }));
      setCustomerSearchText("");
    }
  };

  //to update local_state to global filter_context_state
  const handleFilter = useCallback(() => {
    setFilters(localFilters);
  }, [localFilters]);

  //fetching curstomer_list
  const getCustomerList = async () => {
    await api
      .post("proxy.php", {
        clientCode: clientDetail.clientCode,
        sessionKey: clientDetail.sessionKey,
        request: "getCustomers",
        recordsOnPage: 1000,
        getFields: "customerID,firstName,lastName,fullName",
        searchNameIncrementally: customerSearchText,
      })
      .then((res) => setCustomersList(res.data.records));
  };

  //

  useEffect(() => {
    if (timer) clearTimeout(timer);

    if (customerSearchText?.length >= 2) {
      const newTimer = setTimeout(() => getCustomerList(), 500);
      setTimeout(newTimer);
      setTimer(newTimer);
    } else setCustomersList([]);
  }, [customerSearchText]);

  useEffect(() => {
    console.log("localFilter", localFilters);
    console.log("globalFilter", filters);
  }, [localFilters, filters]);
  // useEffect(() => console.log(customerSearchText), [customerSearchText]);
  // useEffect(() => console.log(customersList), [customersList]);

  return (
    <Box
      position={"absolute"}
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"20px"}
      alignSelf={"center"}
    >
      <Autocomplete
        disablePortal
        size="small"
        id={uniqid()}
        sx={{ width: 300 }}
        value={
          customersList.find(
            (customer) => customer.customerID === localFilters.customerID
          ) || null
        }
        options={customersList ?? []}
        getOptionLabel={(option) => option?.fullName || ""}
        isOptionEqualToValue={(option, value) =>
          option.customerID === value.customerID
        }
        onChange={handleCustomerSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Customer Filter"
            onChange={(e) => {
              setCustomerSearchText(e.target.value);
            }}
          />
        )}
      />

      <FormControl>
        <InputLabel size="small" id="demo-simple-select-label">
          Location Filter
        </InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={localFilters.locationID}
          label="Location Filter"
          onChange={(e) =>
            setLocalFilters((prev) => ({
              ...prev,
              locationID: e?.target.value,
            }))
          }
          sx={{ width: "300px" }}
        >
          <MenuItem value="">None</MenuItem>
          {locations?.map((location, index) => (
            <MenuItem value={location.id} key={index}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <label style={{ width: "50px", color: "black", opacity: 0.7 }}>
          From :
        </label>
        <DateBox
          width={"150px"}
          placeholder="dd/mm/yyyy"
          value={
            localFilters.fromDate !== ""
              ? new Date(localFilters.fromDate)
              : null
          }
          onValueChange={(value) => {
            setLocalFilters((prev) => ({
              ...prev,
              fromDate: formatDate(value),
            }));
          }}
          type="date"
          displayFormat="dd/MM/yyyy"
        />
      </Box>

      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <label style={{ width: "50px", color: "black", opacity: 0.7 }}>
          To :
        </label>
        <DateBox
          width={"150px"}
          placeholder="dd/mm/yyyy"
          value={
            localFilters.toDate !== "" ? new Date(localFilters.toDate) : null
          }
          onValueChange={(value) => {
            setLocalFilters((prev) => ({
              ...prev,
              toDate: formatDate(value),
            }));
          }}
          type="date"
          displayFormat="dd/MM/yyyy"
        />
      </Box>
      <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
        {/* <Box> */}
        <Button
          variant="contained"
          sx={{ width: "150px" }}
          onClick={handleFilter}
        >
          Filter
        </Button>
        {/* </Box> */}

        {/* <Box> */}
        <Button
          variant="contained"
          color="warning"
          sx={{ width: "150px" }}
          onClick={() => {
            setLocalFilters(initialFilters);
            setFilters(initialFilters);
            setCustomerSearchText("");
          }}
        >
          Reset
        </Button>
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default FilterSection;
