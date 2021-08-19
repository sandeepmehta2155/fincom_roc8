import { useState, createContext, useContext } from "react";

const CartAndWishlistQuantityContext = createContext();

export function useCartAndWishlistQuantity() {
  return useContext(CartAndWishlistQuantityContext);
}

export function CartAndWishlistQuantityProvider({ children }) {
  const { wishlistLength } = JSON.parse(
    localStorage.getItem("wishlistLength")
  ) || {
    wishlistLength: 0
  };

  const { cartlistLength } = JSON.parse(
    localStorage.getItem("cartlistLength")
  ) || {
    cartlistLength: 0
  };

  const [cartTotalQuantity, setCartQuantity] = useState(cartlistLength);

  const [wishListQuantity, setWishListQuantity] = useState(wishlistLength);

  return (
    <CartAndWishlistQuantityContext.Provider
      value={{
        cartTotalQuantity,
        setCartQuantity,
        wishListQuantity,
        setWishListQuantity
      }}
    >
      {children}
    </CartAndWishlistQuantityContext.Provider>
  );
}
