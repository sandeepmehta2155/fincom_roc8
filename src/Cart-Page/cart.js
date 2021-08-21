import { Link } from "react-router-dom";
import { useProd } from "../Products-Page/product-context";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Cart = () => {
  const { itemsInProduct } = useProd();

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const { wishlistObj } = JSON.parse(localStorage.getItem("wishlistObj")) || {
    wishlistObj: []
  };

  const { cartlistObj } = JSON.parse(localStorage.getItem("cartlistObj")) || {
    cartlistObj: []
  };

  const [cart, setCart] = useState(cartlistObj);

  const [quantity, setQuantity] = useState({
    cartquantity: cartlistObj.length,
    wishlistquantity: wishlistObj.length
  });

  const notifyCart = () =>
    toast.success("Updating Cart", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  async function DecrementCartItem(_id) {
    notifyCart();
    const response = await axios.post(
      "https://e-commerce.sandeepmehta215.repl.co/updatecart/decrementcartitem",
      {
        username: username,
        cartids: _id
      }
    );

    if (typeof response.data.cart === "object") {
      localStorage.setItem(
        "cartlistObj",
        JSON.stringify({ cartlistObj: response.data.cart })
      );

      localStorage.setItem(
        "cartlistLength",
        JSON.stringify({ cartLength: response.data.cart.length })
      );
      if (username) {
        setQuantity({ ...quantity, cartquantity: response.data.cart.length });
        setCart(response.data.cart);
      }
    }
  }

  async function IncrementCartItem(_id) {
    notifyCart();
    const response = await axios.post(
      "https://e-commerce.sandeepmehta215.repl.co/updatecart/incrementcartitem",
      {
        username: username,
        cartids: _id
      }
    );

    if (typeof response.data.cart === "object") {
      localStorage.setItem(
        "cartlistObj",
        JSON.stringify({ cartlistObj: response.data.cart })
      );

      localStorage.setItem(
        "cartlistLength",
        JSON.stringify({ cartLength: response.data.cart.length })
      );
      if (username) {
        setQuantity({ ...quantity, cartquantity: response.data.cart.length });
        setCart(response.data.cart);
      }
    }
  }

  async function RemoveFromCart(_id) {
    notifyCart();
    const response = await axios.post(
      "https://e-commerce.sandeepmehta215.repl.co/updatecart/removefromcart",
      {
        username: username,
        cartids: _id
      }
    );

    if (typeof response.data.cart === "object") {
      localStorage.setItem(
        "cartlistObj",
        JSON.stringify({ cartlistObj: response.data.cart })
      );

      localStorage.setItem(
        "cartlistLength",
        JSON.stringify({ cartLength: response.data.cart.length })
      );
      if (username) {
        setQuantity({ ...quantity, cartquantity: response.data.cart.length });
        setCart(response.data.cart);
      }
    }
  }

  useEffect(
    () =>
      (async function () {
        const responseForCart = await axios.post(
          "https://e-commerce.sandeepmehta215.repl.co/updatecart",
          {
            username: username
          }
        );
        if (username) setCart(responseForCart.data.cart);
      })(),
    []
  );

  return (
    <>
      <div className="cartTotalQuantity">
        <strong>{quantity.cartquantity}</strong>
      </div>
      <div className="wishListTotalQuantity">
        <strong>{quantity.wishlistquantity}</strong>
      </div>
      <ToastContainer />
      <>
        <div className="cartDetails">
          <h2> Shopping Cart </h2>

          <div className="cartCheckOut">
            <h2>
              <strong>Check Out to here</strong>{" "}
            </h2>
            <h3>Cart Total Quantity : {quantity.cartquantity} </h3>
          </div>

          {quantity.cartquantity === 0 && (
            <div className="cartEmptyCard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-basket"
                viewBox="0 0 16 16"
              >
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
              </svg>
              <br />
              <h3> Hey, it feels so light</h3>

              <span> Let's add some items from wishlist</span>
              <br />

              <Link to="/wishlist">
                <button className="AddItemsFromWishlist">
                  {" "}
                  Add items from Wishlist
                </button>
              </Link>
            </div>
          )}
          <ul>
            {itemsInProduct.map((obj) => {
              return (
                <div key={obj.id}>
                  {cart
                    .map((cartObj) => {
                      if (cartObj.cartid !== obj.id) return obj;
                      // return undefined;
                    })
                    .filter((key) => key !== undefined).length < cart.length ? (
                    <li
                      className="cartProduct"
                      key={obj.id}
                      style={{ listStyle: "none" }}
                    >
                      <img
                        height="200px"
                        src={obj.src}
                        alt="loading.."
                        className="cartImg"
                      />
                      <div className="cartProductDetails">
                        <div className="cartProductName">{obj.name}</div>

                        <br />
                        <div>
                          Rs {obj.price}
                          <span>
                            <s>Rs {obj.Originalprice}</s>
                          </span>
                          {"   "}|{"   "}
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
                          className="decButton"
                          onClick={() => {
                            DecrementCartItem(obj.id);
                          }}
                        >
                          -
                        </button>

                        <button
                          className="incButton"
                          onClick={() => {
                            IncrementCartItem(obj.id);
                          }}
                        >
                          +
                        </button>
                        <div>
                          Cart quantity :
                          {
                            cart.find((cartObj) => cartObj.cartid === obj.id)
                              .cartidquantity
                          }
                        </div>
                        <button
                          className="cartbi-trashButton"
                          onClick={() => {
                            RemoveFromCart(obj.id);
                          }}
                        >
                          Remove From Cart
                        </button>
                      </div>
                    </li>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </>
    </>
  );
};
