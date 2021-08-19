import { useContext, createContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [IncludeOutOfStock, setIncludeOutOfStock] = useState(true);
  const [fastDelvry, setFastDelivery] = useState(false);
  const [value, setValue] = useState(1);
  const [sorting, setSorting] = useState("");

  return (
    <FilterContext.Provider
      value={{
        IncludeOutOfStock,
        setIncludeOutOfStock,
        fastDelvry,
        setFastDelivery,
        value,
        setValue,
        sorting,
        setSorting
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
