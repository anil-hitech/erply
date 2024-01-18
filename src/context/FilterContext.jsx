import { Children, createContext, useState } from "react";

const FilterContext = createContext();

const FilterContextProvider = () => {
  const [filter, setFilter] = useState();
  const [locations, setLocations] = useState([]);

  const getFilters = (filter) => setSummaryFilter(filter);
  const handleResetFilters = () => setSummaryFilter(initialFilters);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {Children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
