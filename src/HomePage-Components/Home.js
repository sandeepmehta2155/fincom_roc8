import * as useComponent from "../index";
import { useCartAndWishlistQuantity } from "../Cart-Wishlist-Provider/cart-wishlist-provider";
import { useAuth } from "../Login-Page/auth-context";

export function Home() {
  const { cartTotalQuantity, wishListQuantity } = useCartAndWishlistQuantity();

  const { isUserLoggedIn } = useAuth();

  return (
    <>
      <img
        src="https://static.onecms.io/wp-content/uploads/sites/34/2019/12/bookshelf-organization-dark-room-full-rick-lozier-1219.jpg"
        alt="loading..."
        className="ImgHomePage"
      />
      {isUserLoggedIn && (
        <>
          <div className="cartTotalQuantity">
            <strong>{cartTotalQuantity}</strong>
          </div>
          <div className="wishListTotalQuantity">
            <strong>{wishListQuantity}</strong>
          </div>
        </>
      )}
      {!isUserLoggedIn && (
        <>
          <div className="cartTotalQuantity">
            <strong>0</strong>
          </div>
          <div className="wishListTotalQuantity">
            <strong>0</strong>
          </div>
        </>
      )}
      <useComponent.FeaturedAuthors />
      <useComponent.BookBatches />
    </>
  );
}
