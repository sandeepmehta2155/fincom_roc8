import axios from "axios";
import { createContext, useReducer, useContext } from "react";
import { useProd } from "./product-context";

const ProductReducerContext = createContext();

export function ProductReducerProvider({ children }) {
  const { itemsInProduct } = useProd();

  const [productState, productDispatch] = useReducer(productReducer, {
    itemsInProduct
  });

  return (
    <ProductReducerContext.Provider
      value={{
        itemsInProduct: productState.itemsInProduct,
        productDispatch
      }}
    >
      {children}
    </ProductReducerContext.Provider>
  );
}

export function useProdReducer() {
  return useContext(ProductReducerContext);
}

export function productReducer(state, action) {
  const { username } = JSON.parse(localStorage.getItem("username"));

  switch (action.type) {
    case "ADD_TO_CART":
      return (async function () {
        axios
          .post("https://e-commerce.sandeepmehta215.repl.co/signup/addtocart", {
            username: username,
            cartIDs: action.obj.id
          })
          .then((resp) => {
            // console.log(resp.data.message);
          });
      })();

    case "REMOVE_FROM_CART":
      return (async function () {
        axios
          .post(
            "https://e-commerce.sandeepmehta215.repl.co/signup/removefromcart",
            {
              username: username,
              cartIDs: action.obj.id
            }
          )
          .then((resp) => {
            // console.log(resp.data.message);
          });
      })();

    case "ADD_TO_WISHLIST":
      return (async function () {
        axios
          .post(
            "https://e-commerce.sandeepmehta215.repl.co/signup/addtowishlist",
            {
              username: username,
              wishListIDs: action.obj.id
            }
          )
          .then((resp) => {
            // console.log(resp.data.message);
          });
      })();

    case "REMOVE_FROM_WISHLIST":
      return (async function () {
        axios
          .post(
            "https://e-commerce.sandeepmehta215.repl.co/signup/removefromwishlist",
            {
              username: username,
              wishListIDs: action.obj.id
            }
          )
          .then((resp) => {
            // console.log(resp.data.message);
          });
      })();

    default:
      return state;
  }
}
