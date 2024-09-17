import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const FeaturedAuthorContext = createContext();

export function FeaturedAuthorProvider({ children }) {
  const [FeaturedAuthors, setFeaturedAuthors] = useState([]);
  const [FeaturedSeries, setFeaturedSeries] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("https://e-commerce.sandeepmehta215.repl.co/featured")
        .then((resp) => {
          setFeaturedAuthors(resp.data.FeaturedAuthors);

          setFeaturedSeries(resp.data.FeaturedSeries);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <FeaturedAuthorContext.Provider value={{ FeaturedAuthors, FeaturedSeries }}>
      {children}
    </FeaturedAuthorContext.Provider>
  );
}

export function useFeaturedAuthor() {
  return useContext(FeaturedAuthorContext);
}
