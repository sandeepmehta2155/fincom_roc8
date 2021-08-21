import { useEffect, useState } from "react";
import { useProd } from "./product-context";
import axios from "axios";
import { useFilter } from "./filter-context";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = () => {
  const [filterModal, setFilterModal] = useState("none");
  const [sortModal, setSortModal] = useState("none");
  const navigate = useNavigate();

  const {
    fastDelvry,
    setFastDelivery,
    value,
    setValue,
    sorting,
    setSorting,
    IncludeOutOfStock,
    setIncludeOutOfStock
  } = useFilter();

  const { itemsInProduct } = useProd();

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const options = [
    { value: "HighToLow", label: "Price : High to Low" },
    { value: "LowToHigh", label: "Price : Low to High" }
  ];

  const { wishlistObj } = JSON.parse(localStorage.getItem("wishlistObj")) || {
    wishlistObj: []
  };

  const [wishlist, setWishlist] = useState(wishlistObj);

  const { cartlistObj } = JSON.parse(localStorage.getItem("cartlistObj")) || {
    cartlistObj: []
  };

  const [quantity, setQuantity] = useState({
    cartquantity: cartlistObj.length,
    wishlistquantity: wishlistObj.length
  });

  const [cart, setCart] = useState(cartlistObj);

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

  const notifyWishlist = () =>
    toast.success("Updating Wishlist", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  async function AddToCart(_id) {
    notifyCart();
    const response = await axios.post(
      "https://e-commerce.sandeepmehta215.repl.co/updatecart/addtocart",
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
    }

    localStorage.setItem(
      "cartlistLength",
      JSON.stringify({ cartLength: response.data.cart.length })
    );

    setQuantity({ ...quantity, cartquantity: response.data.cart.length });
    setCart(response.data.cart);
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
    }

    localStorage.setItem(
      "cartlistLength",
      JSON.stringify({ cartLength: response.data.cart.length })
    );

    setQuantity({ ...quantity, cartquantity: response.data.cart.length });
    setCart(response.data.cart);
  }

  async function AddToWishlist(_id) {
    notifyWishlist();
    const response = await axios.post(
      "https://e-commerce.sandeepmehta215.repl.co/updatewishlist/addtowishlist",
      {
        username: username,
        wishlistids: _id
      }
    );

    if (typeof response.data.wishlist === "object") {
      localStorage.setItem(
        "wishlistObj",
        JSON.stringify({ wishlistObj: response.data.wishlist })
      );

      setWishlist(response.data.wishlist);

      localStorage.setItem(
        "wishlistLength",
        JSON.stringify({ wishlistLength: response.data.wishlist.length })
      );

      setQuantity({
        ...quantity,
        wishlistquantity: response.data.wishlist.length
      });
    } else {
      setWishlist([]);
    }
  }

  async function RemoveFromWishlist(_id) {
    notifyWishlist();
    const response = await axios.post(
      "https://e-commerce.sandeepmehta215.repl.co/updatewishlist/removefromwishlist",
      {
        username: username,
        wishlistids: _id
      }
    );

    if (typeof response.data.wishlist === "object") {
      localStorage.setItem(
        "wishlistObj",
        JSON.stringify({ wishlistObj: response.data.wishlist })
      );

      setWishlist(response.data.wishlist);

      setQuantity({
        ...quantity,
        wishlistquantity: response.data.wishlist.length
      });

      localStorage.setItem(
        "wishlistLength",
        JSON.stringify({ wishlistLength: response.data.wishlist.length })
      );
    } else {
      setWishlist([]);
    }
  }

  useEffect(
    () =>
      (async function () {
        const responseForWishlist = await axios.post(
          "https://e-commerce.sandeepmehta215.repl.co/updatewishlist",
          {
            username: username
          }
        );

        const responseForCart = await axios.post(
          "https://e-commerce.sandeepmehta215.repl.co/updatecart",
          {
            username: username
          }
        );
        if (username) {
          setCart(responseForCart.data.cart);
          setWishlist(responseForWishlist.data.wishlist);
        }
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
      <>
        <h1 className="productsHead">Books in focus</h1>

        <br />

        <div className="productMainPage">
          <div className="filterSideBar">
            <fieldset className="filterSideBar">
              <legend>
                <h3> Filters </h3>
              </legend>
              <input
                type="checkbox"
                name="checkOne"
                value="IncludeOutOfStock"
                onChange={() => setIncludeOutOfStock(!IncludeOutOfStock)}
              />
              <label htmlFor="checkOne">Include out of stock </label>

              <input
                type="checkbox"
                name="checkTwo"
                value="fastDelivery"
                onChange={() => setFastDelivery(!fastDelvry)}
              />
              <label htmlFor="checkTwo">Fast Delivery</label>
              <br />
              <br />
              <input
                type="range"
                min="1"
                max="1000"
                className="slider"
                value={value}
                onChange={({ target: { value: radius } }) => {
                  setValue(radius);
                }}
              />
              <div>Show items greater than : {value} Rs</div>
            </fieldset>
          </div>
          <div className="productsBar">
            <span className="containerForSelectComponent">
              <label htmlFor="sortingSelectBoxs">Sort by : </label>
              <Select
                name="sortingSelectBox"
                id="sortingSelectBox"
                options={options}
                onChange={(e) => {
                  switch (e.value) {
                    case "LowToHigh":
                      setSorting("lowToHigh");
                      break;
                    case "HighToLow":
                      setSorting("highToLow");
                      break;
                    default:
                      setSorting("");
                  }
                }}
              />
            </span>
            <ToastContainer />
            <ul className="productList">
              {itemsInProduct
                .filter((obj) => {
                  if (IncludeOutOfStock) return obj.stockStatus === "InStock";
                  return obj;
                })
                .filter((obj) => {
                  if (fastDelvry) return obj.fastDelivery === "yes";
                  return obj;
                })
                .filter((obj) => obj.price > value)
                .sort((a, b) =>
                  sorting === "lowToHigh"
                    ? a.price - b.price
                    : b.price - a.price
                )
                .map((obj) => {
                  return (
                    <li
                      className="productCard"
                      key={obj.id}
                      style={{ listStyle: "none" }}
                    >
                      <div className="cardProductDetails">
                        <div>
                          <div>
                            {wishlist
                              .map((wishlistObj) => {
                                if (wishlistObj !== obj.id) return obj;
                                // else return obj;
                              })
                              .filter((key) => key !== undefined).length <
                            wishlist.length ? (
                              <span
                                className="love active"
                                onClick={() => {
                                  username
                                    ? RemoveFromWishlist(obj.id)
                                    : navigate("/login");
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
                            ) : (
                              <span
                                className="love"
                                onClick={() => {
                                  username
                                    ? AddToWishlist(obj.id)
                                    : navigate("/login");
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
                                <button className="heartButton">
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
                                </button>
                              </span>
                            )}
                          </div>
                          <img
                            className="cardImage"
                            src={obj.src}
                            alt="loading.."
                          />
                          {cart
                            .map((cartObj) => {
                              if (cartObj.cartid !== obj.id) return obj;
                              // else return obj;
                            })
                            .filter((key) => key !== undefined).length <
                          cart.length ? (
                            <button
                              className="cartButtonProducts"
                              onClick={() => {
                                username
                                  ? RemoveFromCart(obj.id)
                                  : navigate("/login");
                              }}
                            >
                              Remove From Cart
                            </button>
                          ) : (
                            <button
                              className="cartButtonProducts"
                              onClick={() => {
                                username
                                  ? AddToCart(obj.id)
                                  : navigate("/login");
                              }}
                            >
                              Add to cart
                              <span role="img" aria-labelledby="cart">
                                🛒
                              </span>
                            </button>
                          )}

                          <div className="card-title">{obj.name}</div>
                          <div className="card-price">
                            Rs {obj.price}
                            <span style={{ margin: ".5rem" }}>
                              <s>Rs {obj.Originalprice}</s>
                            </span>
                          </div>
                        </div>
                        <br />
                      </div>
                    </li>
                  );
                })}{" "}
            </ul>
          </div>
          <div className="filterBox">
            <fieldset className="filterFooter" style={{ display: filterModal }}>
              <legend>Filters</legend>
              <input
                type="checkbox"
                name="checkOne"
                value="IncludeOutOfStock"
                onChange={() => setIncludeOutOfStock(!IncludeOutOfStock)}
              />
              <label htmlFor="checkOne">Include out of stock </label>

              <input
                type="checkbox"
                name="checkTwo"
                value="fastDelivery"
                onChange={() => setFastDelivery(!fastDelvry)}
              />
              <label htmlFor="checkTwo">Fast Delivery</label>
              <br />
              <br />
              <input
                type="range"
                min="1"
                max="1000"
                className="slider"
                value={value}
                onChange={({ target: { value: radius } }) => {
                  setValue(radius);
                }}
              />
              <div>Show items greater than : {value} Rs</div>
            </fieldset>
            <fieldset className="sortFooter" style={{ display: sortModal }}>
              <legend>Sort By</legend>
              <input
                type="radio"
                name="sorting"
                value="lowToHigh"
                onChange={() => setSorting("lowToHigh")}
              />
              <label htmlFor="lowToHigh">High-To-Low</label>
              <input
                type="radio"
                name="sorting"
                value="highToLow"
                onChange={() => setSorting("highToLow")}
              />
              <label htmlFor="HighToLow">Low-To-High</label>
            </fieldset>
          </div>
          <div className="filterAndSort">
            <button
              className="bi bi-sort-down"
              onClick={() =>
                sortModal === "none"
                  ? setSortModal("block")
                  : setSortModal("none")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
              </svg>
            </button>
            <button
              className="bi bi-filter"
              onClick={() =>
                filterModal === "none"
                  ? setFilterModal("block")
                  : setFilterModal("none")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
              </svg>
            </button>
          </div>
        </div>
      </>
    </>
  );
};
