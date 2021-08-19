import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const BookBatchContext = createContext();

export function BookBatchProvider({ children }) {
  const [img, setImg] = useState([]);
  useEffect(() => {
    axios
      .get("https://e-commerce.sandeepmehta215.repl.co/bookbatches")
      .then((resp) => {
        if (resp.status === 200) setImg(resp.data.images);
        else setImg("loading...");
      });
  }, []);
  return (
    <BookBatchContext.Provider value={{ img }}>
      {children}
    </BookBatchContext.Provider>
  );
}

export function useBookBatches() {
  return useContext(BookBatchContext);
}
