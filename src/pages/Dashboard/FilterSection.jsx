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

const initialFilters = {
  customerID: "",
  locationID: "",
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
    (e) => setFilters((prev) => ({ ...prev, customerID: e?.target.value })),
    [filters]
  );

  useEffect(() => {
    getFilters(filters);
    console.log("filters", filters);
  }, [filters]);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      gap={"20px"}
      alignSelf={"center"}
    >
      {/* <FormControl>
        <InputLabel id="demo-simple-select-label">Customer Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filters.customerID}
          label="Customer Filter"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, customerID: e?.target.value }))
          }
          // onSelect={(e) =>
          //   setFilters((prev) => ({ ...prev, customerID: e?.target.value }))
          // }
          sx={{ width: "300px" }}
          >
          <MenuItem value="">None</MenuItem>
          {customers?.map((customer, index) => (
            <MenuItem value={customer.customerID} key={index}>
            {customer.fullName}
            </MenuItem>
            ))}
            </Select>
          </FormControl> */}

      <Autocomplete
        disablePortal
        id={uniqid()}
        options={customers?.map((customer) => customer.fullName) || []}
        onChange={(_, selectedName) => {
          setFilters((prev) => ({
            ...prev,
            customerID: selectedName,
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

      <Button
        variant="contained"
        size="small"
        sx={{ width: "150px" }}
        onClick={handleFilter}
      >
        Filter
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={{ width: "150px" }}
        onClick={() => {
          handleReset();
          setFilters(initialFilters);
        }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default FilterSection;
