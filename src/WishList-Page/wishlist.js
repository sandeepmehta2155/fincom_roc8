import { useProd } from "../Products-Page/product-context";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useProdReducer } from "../Products-Page/product-reducer";
import { useCartAndWishlistQuantity } from "../Cart-Wishlist-Provider/cart-wishlist-provider";

export const WishList = () => {
  const { itemsInProduct } = useProd();

  const { productDispatch } = useProdReducer();

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };
  const {
    cartTotalQuantity,
    wishListQuantity,
    setWishListQuantity,
    setCartQuantity
  } = useCartAndWishlistQuantity();

  const { wishlistObj } = JSON.parse(localStorage.getItem("wishlistObj")) || {
    wishlistObj: []
  };

  const [wishlist, setWishlist] = useState(wishlistObj);

  const { cartlistObj } = JSON.parse(localStorage.getItem("cartlistObj")) || {
    cartlistObj: []
  };

  const [cart, setCart] = useState(cartlistObj);

  const [popUp, setPopUp] = useState("none");

  async function CallCart() {
    if (username) {
      axios
        .post("https://e-commerce.sandeepmehta215.repl.co/signup/cart", {
          username: username
        })
        .then((resp) => {
          setPopUp("none");

          if (typeof resp.data.cart === "object") {
            localStorage.setItem(
              "cartlistObj",
              JSON.stringify({ cartlistObj: resp.data.cart })
            );

            setCart(resp.data.cart);

            setCartQuantity(resp.data.cart.length);

            localStorage.setItem(
              "cartlistLength",
              JSON.stringify({ cartLength: resp.data.cart.length })
            );
          } else {
            setCart([]);
          }
        });
    }
  }

  async function CallWishList() {
    if (username)
      await axios
        .post("https://e-commerce.sandeepmehta215.repl.co/signup/wishlist", {
          username: username
        })
        .then((resp) => {
          if (typeof resp.data.wishlist === "object") {
            localStorage.setItem(
              "wishlistObj",
              JSON.stringify({ wishlistObj: resp.data.wishlist })
            );

            setWishlist(resp.data.wishlist);

            setPopUp("none");

            localStorage.setItem(
              "wishlistLength",
              JSON.stringify({ wishlistLength: resp.data.wishlist.length })
            );

            setWishListQuantity(resp.data.wishlist.length);
          } else {
            setWishlist([]);
          }
        });
  }

  // useEffect(() => {
  //   if (username)
  //     axios
  //       .post("https://e-commerce.sandeepmehta215.repl.co/signup/wishlist", {
  //         username: username
  //       })
  //       .then((resp) => {
  //         if (typeof resp.data.wishlist === "object") {
  //           // localStorage.setItem(
  //           //   "wishlistObj",
  //           //   JSON.stringify({ wishlistObj: resp.data.wishlist })
  //           // );

  //           setWishlist(resp.data.wishlist);

  //           localStorage.setItem(
  //             "wishlistLength",
  //             JSON.stringify({ wishlistLength: resp.data.wishlist.length })
  //           );
  //           setPopUp("none");
  //           setWishListQuantity(resp.data.wishlist.length);
  //         } else {
  //           setWishlist([]);
  //         }
  //       });
  // }, [popUp]);

  return (
    <>
      <div className="cartTotalQuantity">
        <strong>{cartTotalQuantity}</strong>
      </div>
      <div className="wishListTotalQuantity">
        <strong>{wishListQuantity}</strong>
      </div>
      <>
        <div className="wishListPage">
          <h2> Your Wishlist </h2>
          <div className="snackBar" style={{ display: popUp }}>
            Updating Wishlist.....
          </div>
          {!username && (
            <div className="cartEmptyCard">
              <h3> Please Login to view WishList</h3>
              <span> Login to see your WishList</span>
              <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-wind"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-handbag"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z" />
              </svg>
              <br />
              <br />
              <Link to="/login">
                <button className="LoginButton">Login</button>
              </Link>
            </div>
          )}
          {username && wishListQuantity === 0 && (
            <div className="cartEmptyCard">
              <h3> Please Add Items to WishList</h3>

              <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-wind"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-handbag"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z" />
              </svg>
              <br />
              <br />
              <Link to="/products">
                <button className="LoginButton">View Products</button>
              </Link>
            </div>
          )}
          <div>
            {itemsInProduct.map((obj) => {
              return (
                <ul>
                  {wishlist
                    .map((wishlistObj) => {
                      if (wishlistObj !== obj.id) return obj;
                      // else return obj;
                    })
                    .filter((key) => key !== undefined).length <
                  wishlist.length ? (
                    <li key={obj.id} className="wishListProduct">
                      <img
                        height="200px"
                        src={obj.src}
                        alt="loading.."
                        className="cartImg"
                      />
                      <div className="wishListProductDetails">
                        <div className="wishlistProduct-title">{obj.name}</div>
                        <br />
                        <div>
                          Rs {obj.price}
                          <span style={{ margin: ".5rem" }}>
                            <s>Rs {obj.Originalprice}</s>
                          </span>
                          |{" "}
                          <span>
                            1 offer available{"   "}
                            <svg
                              width="14"
                              height="14"
                              xmlns="http://www.w3.org/2000/svg"
                              className="_3GN0Y0"
                            >
                              <g fill="none">
                                <path d="M-1-1h16v16H-1"></path>
                                <path
                                  d="M7 0C3.136 0 0 3.136 0 7s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7zm.7 10.5H6.3V6.3h1.4v4.2zm0-5.6H6.3V3.5h1.4v1.4z"
                                  fill="#388e3c"
                                  class=""
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </div>
                        <br />
                        <button
                          className="wishListbi-trashButton"
                          onClick={() => {
                            setPopUp("block");

                            productDispatch({ type: "ADD_TO_CART", obj });

                            setTimeout(() => CallCart(), 800);
                          }}
                        >
                          Add to cart
                          <span role="img" aria-labelledby="cart">
                            🛒
                          </span>
                        </button>
                        <button
                          className="wishListbi-trashButton"
                          onClick={() => {
                            setPopUp("block");

                            productDispatch({
                              type: "REMOVE_FROM_CART",
                              obj
                            });

                            setTimeout(() => CallCart(), 800);
                          }}
                        >
                          Remove From Cart
                        </button>
                        <button
                          className="wishListbi-wishListHeartButton"
                          onClick={() => {
                            setPopUp("block");

                            productDispatch({
                              type: "REMOVE_FROM_WISHLIST",
                              obj
                            });

                            setTimeout(() => CallWishList(), 800);
                          }}
                        >
                          <span
                            className="love active"
                            onClick={() => {
                              setPopUp("block");

                              productDispatch({
                                type: "REMOVE_FROM_WISHLIST",
                                obj
                              });

                              setTimeout(() => CallWishList(), 800);
                            }}
                          >
                            <span className="drop"></span>
                            <span className="drop"></span>
                            <span className="drop"></span>
                            <span className="drop"></span>
                            <span className="drop"></span>
                            <span className="drop"></span>
                            <span className="drop"></span>
                            <span className="circleheart"></span>

                            <svg
                              className="heart"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              x="0"
                              y="0"
                              width="510"
                              height="510"
                              viewBox="0 0 510 510"
                              // xml:space="preserve"
                            >
                              <path d="M255 489.6l-35.7-35.7C86.7 336.6 0 257.6 0 160.7 0 81.6 61.2 20.4 140.3 20.4c43.4 0 86.7 20.4 114.8 53.6C283.1 40.8 326.4 20.4 369.8 20.4 448.8 20.4 510 81.6 510 160.7c0 96.9-86.7 176-219.3 293.3L255 489.6z" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              );
            })}
          </div>
          <span style={{ visibility: "hidden" }}>
            {popUp === "block" && (document.body.style.opacity = 0.7)}
            {popUp === "none" && (document.body.style.opacity = 1)}
          </span>
        </div>
      </>
    </>
  );
};
