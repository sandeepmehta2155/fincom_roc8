import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  useEffect(
    () =>
      (async function () {
        try {
          axios
            .get("https://e-commerce.sandeepmehta215.repl.co/products")
            .then((response) => {
              setItemsinProduct(response.data.ItemsInProduct);
            });
        } catch (error) {
          console.log(error);
          setItemsinProduct([0]);
        }
      })(),
    []
  );
  const [itemsInProduct, setItemsinProduct] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        itemsInProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProd() {
  return useContext(ProductContext);
}
