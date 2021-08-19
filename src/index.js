import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./Products-Page/product-context";
import { FilterProvider } from "./Products-Page/filter-context";
import { ThemeProvider } from "./HomePage-Components/theme-context";
import { AuthProvider } from "./Login-Page/auth-context";
import { FeaturedAuthorProvider } from "./HomePage-Components/featured-provider";
import { BookBatchProvider } from "./HomePage-Components/book-batch-provider";
import { ProductReducerProvider } from "./Products-Page/product-reducer";
import { CartAndWishlistQuantityProvider } from "./Cart-Wishlist-Provider/cart-wishlist-provider";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import reportWebVitals from './reportWebVitals';

export { RedirectPage } from "./Redirect-Page/Redirect-Page";
export { Header } from "./HomePage-Components/header";
export { Footer } from "./HomePage-Components/footer";
export { FeaturedAuthors } from "./HomePage-Components/featured-authors";
export { BookBatches } from "./HomePage-Components/book-batch";
export { Login } from "./Login-Page/Login";
export { Subscription } from "./Login-Page/Subscription";
export { Products } from "./Products-Page/products";
export { Home } from "./HomePage-Components/Home";
export { Cart } from "./Cart-Page/cart";
export { WishList } from "./WishList-Page/wishlist";
export { UserProfile } from "./UserProfile-Page/userprofile";
export { PrivateRoute } from "./UserProfile-Page/PrivateRoute";
export { RouteComponents } from "./Router-Components/Route-Components";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CartAndWishlistQuantityProvider>
          <ThemeProvider>
            <ProductProvider>
              <ProductReducerProvider>
                <FeaturedAuthorProvider>
                  <BookBatchProvider>
                    <FilterProvider>
                      <App />
                    </FilterProvider>
                  </BookBatchProvider>
                </FeaturedAuthorProvider>
              </ProductReducerProvider>
            </ProductProvider>
          </ThemeProvider>
        </CartAndWishlistQuantityProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
