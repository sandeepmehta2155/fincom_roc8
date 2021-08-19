import { createContext, useEffect, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { login } = JSON.parse(localStorage.getItem("login")) || {
    login: false
  };

  const [isUserLoggedIn, setUserLogin] = useState(login);

  const [checkResponseFromDataBase, setResponseFromDataBase] = useState("");

  const [userExists, setUserExists] = useState("none");
  const [checkPassword, setCheckPassword] = useState("none");

  const navigate = useNavigate();

  useEffect(() => {
    setUserExists("block");

    checkResponseFromDataBase === "Req can't be made"
      ? setUserExists("block")
      : setUserExists("none");

    checkResponseFromDataBase === "wrong password"
      ? setCheckPassword("block")
      : setCheckPassword("none");

    if (checkResponseFromDataBase === "user auth successful") {
      setUserLogin(true);

      localStorage.setItem("login", JSON.stringify({ login: true }));
    }
  }, [checkResponseFromDataBase]);

  function LogOut() {
    setUserLogin(false);
    setUserExists("none");
    setCheckPassword("none");
    localStorage.removeItem("cartlistLength");
    localStorage.removeItem("wishlistLength");
    localStorage.removeItem("cartlistObj");
    localStorage.removeItem("login");
    localStorage.removeItem("wishlistObj");
    localStorage.removeItem("username");
    navigate("/");
  }

  function LoginUserWithCredentials(userName, passwordInput) {
    (async function () {
      axios
        .post("https://e-commerce.sandeepmehta215.repl.co/userauth", {
          username: userName,
          password: passwordInput
        })
        .then((response) => {
          setResponseFromDataBase(response.data.message);
          if (response.data.message === "user auth successful") {
            // console.log(response);
            localStorage.setItem(
              "wishlistObj",
              JSON.stringify({
                wishlistObj: response.data.wishlist
              })
            );

            localStorage.setItem(
              "wishlistLength",
              JSON.stringify({
                wishlistLength: response.data.wishlist.length
              })
            );

            localStorage.setItem(
              "cartlistObj",
              JSON.stringify({
                cartlistObj: response.data.cart
              })
            );
            localStorage.setItem(
              "cartlistLength",
              JSON.stringify({
                cartlistLength: response.data.cart.length
              })
            );

            localStorage.setItem(
              "username",
              JSON.stringify({
                username: response.data.username
              })
            );
            setTimeout(() => {
              navigate("/products");
            }, 800);
          }
        });
    })();
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setUserLogin,
        LogOut,
        LoginUserWithCredentials,
        userExists,
        checkPassword,
        setUserExists,
        setCheckPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
