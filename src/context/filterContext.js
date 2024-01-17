import { Children, createContext, useState } from "react";

const FilterContext = createContext();

const FilterContextProvider = () => {
  const [filter, setFilter] = useState();
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {Children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
