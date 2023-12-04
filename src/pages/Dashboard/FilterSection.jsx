import React, { useCallback, useEffect, useState } from "react";
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
    <Box display={"flex"} flexDirection={"column"} gap={"25px"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={"20px"}
        alignSelf={"center"}
      >
        <Autocomplete
          disablePortal
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
          <InputLabel id="demo-simple-select-label">Location Filter</InputLabel>
          <Select
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
        {/* <Box> */}
        <Button
          variant="contained"
          size="large"
          sx={{ width: "100px" }}
          onClick={handleFilter}
        >
          Filter
        </Button>
        {/* </Box> */}

        {/* <Box> */}
        <Button
          variant="contained"
          size="large"
          sx={{ width: "100px" }}
          onClick={() => {
            handleReset();
            setFilters(initialFilters);
          }}
        >
          Reset
        </Button>
        {/* </Box> */}
      </Box>
      <Box display={"flex"} justifyContent={"center"} gap={"30px"}>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <label>From :</label>
          <DateBox
            value={filters.fromDate}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                fromDate: value?.toISOString().split("T")[0],
              }))
            }
            type="date"
            displayFormat="dd/MM/yyyy"
          />
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <label>To :</label>
          <DateBox
            value={filters.toDate}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                toDate: value?.toISOString().split("T")[0],
              }))
            }
            type="date"
            displayFormat="dd/MM/yyyy"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
