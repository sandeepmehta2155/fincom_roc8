import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { login } = JSON.parse(localStorage.getItem("login")) || {
    login: false
  };

  const [isUserLoggedIn, setUserLogin] = useState(login);

  const [userExists, setUserExists] = useState("none");
  const [checkPassword, setCheckPassword] = useState("none");

  const navigate = useNavigate();

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

  async function LoginUserWithCredentials(userName, passwordInput) {
    setUserExists("none");
    setCheckPassword("none");

    const response = await axios.get(
      `https://e-commerce.sandeepmehta215.repl.co/userauth/${userName}?password=${passwordInput}`
    );

    if (response.data.message === "user auth is successful") {
      localStorage.setItem(
        "wishlistObj",
        JSON.stringify({
          wishlistObj: response.data.wishlistids
        })
      );
      localStorage.setItem(
        "wishlistLength",
        JSON.stringify({
          wishlistLength: response.data.wishlistids.length
        })
      );
      localStorage.setItem(
        "cartlistObj",
        JSON.stringify({
          cartlistObj: response.data.cartids
        })
      );
      localStorage.setItem(
        "cartlistLength",
        JSON.stringify({
          cartlistLength: response.data.cartids.length
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
      }, 1000);
    }

    response.data.message === "invalid username"
      ? setUserExists("block")
      : setUserExists("none");

    response.data.message === "invalid password"
      ? setCheckPassword("block")
      : setCheckPassword("none");
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
