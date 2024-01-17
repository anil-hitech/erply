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

function formatDate(date) {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", {
    month: "2-digit",
  });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
}

const initialFilters = {
  customerID: "",
  locationID: "",
  fromDate: "",
  toDate: "",
};

const FilterSection = ({
  locations,
  customers,
  getFilters = () => {}, //to send selected filter query
  handleFilter = () => {}, //to get data after applying filters
  handleReset = () => {}, //to reset the applied filters
}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleTextField = useCallback(
    (e) =>
      setFilters((prev) => ({ ...prev, customerID: e?.target.value || "" })),
    [filters]
  );

  useEffect(() => {
    getFilters(filters); //send filter data to parent
    console.log("filters", filters);
  }, [filters]);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      gap={"20px"}
      alignSelf={"center"}
    >
      <Autocomplete
        disablePortal
        size="small"
        id={uniqid()}
        options={customers?.map((customer) => customer.fullName) || []}
        value={filters?.customerID}
        onChange={(_, selectedName) => {
          setFilters((prev) => ({
            ...prev,
            customerID: selectedName ?? "",
          }));
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Customer Filter"
            onChange={handleTextField}
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
          value={filters.locationID}
          label="Location Filter"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, locationID: e?.target.value }))
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
        <label style={{ width: "50px" }}>From :</label>
        <DateBox
          width={"150px"}
          placeholder="dd/mm/yyyy"
          value={fromDate}
          onValueChange={(value) => {
            setFilters((prev) => ({
              ...prev,
              // fromDate: value?.toISOString().split("T")[0],
              fromDate: value !== null ? formatDate(value) : "",
            }));
            setFromDate(value);
          }}
          type="date"
          displayFormat="dd/MM/yyyy"
        />
      </Box>

      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        setToDate
        <label style={{ width: "30px" }}>To :</label>
        <DateBox
          width={"150px"}
          placeholder="dd/mm/yyyy"
          value={toDate}
          onValueChange={(value) => {
            setFilters((prev) => ({
              ...prev,
              toDate: value !== null ? formatDate(value) : "",
            }));
            setToDate(value);
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
            handleReset();
            setFilters(initialFilters);
            setFromDate(null);
            setToDate(null);
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
