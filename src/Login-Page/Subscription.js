import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Subscription() {
  const [firstNameAndLastName, setFirstNameAndLastName] = useState("");
  const [nameValidation, setNameValidation] = useState("none");

  const [userName, setUserName] = useState("");
  const [userNameValidation, setUserNameValidation] = useState("none");
  const [passwordInput, setUserPassword] = useState("");
  const [passwordReInput, setpasswordReInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailValidation, setEmailValidation] = useState("none");

  const [emailExists, setEmailExists] = useState("none");
  const [userExists, setUserExists] = useState("none");
  const [userAdded, setUserAdded] = useState("none");

  const [type, setType] = useState("password");

  const reg = /([0-9])/;

  async function setResponseFromDB() {
    const response = await axios.post(
      "https://e-commerce.sandeepmehta215.repl.co/signup",
      {
        fullname: firstNameAndLastName,
        username: userName,
        email: emailInput,
        password: passwordInput
      }
    );

    console.log(response.data.message);

    response.data.message === "enter valid email"
      ? setEmailValidation("block")
      : setEmailValidation("none");

    response.data.message === "enter valid name"
      ? setNameValidation("block")
      : setNameValidation("none");

    response.data.message === "enter valid username"
      ? setUserNameValidation("block")
      : setUserNameValidation("none");

    response.data.message === "user Exists for given username"
      ? setUserExists("block")
      : setUserExists("none");

    response.data.message === "user added in database"
      ? setUserAdded("block")
      : setUserAdded("none");

    response.data.message === "email Exists for given username"
      ? setEmailExists("block")
      : setEmailExists("none");
  }

  return (
    <div className="signUpPage">
      <h2>Subscribe</h2>
      <label>Enter your name : </label>
      <input
        type="text"
        id="txt"
        placeholder="    First-name Last-name"
        onChange={(e) => setFirstNameAndLastName(e.target.value)}
      />
      <br />
      <br />
      <small style={{ color: "red", display: nameValidation }}>
        Enter valid name
      </small>

      <br />
      <label>Enter your user-name : </label>
      <input
        type="text"
        id="txt"
        placeholder="    User name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <br />
      <small style={{ color: "red", display: userNameValidation }}>
        Enter valid username
      </small>
      <small style={{ color: "red", display: userExists }}>User exists</small>

      <br />
      <label>Enter your e-mail : </label>

      <input
        type="email"
        id="txt"
        placeholder="    E-mail"
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <br />
      <br />
      <small style={{ color: "red", display: emailValidation }}>
        Enter valid email
      </small>
      <small style={{ color: "red", display: emailExists }}>Email exists</small>

      <br />

      <label>Enter your password : </label>
      <input
        type="password"
        id="email"
        placeholder="     Password"
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <br />
      <br />
      <label>Re-enter your password : </label>
      <input
        id="email"
        type={type}
        placeholder="     Password"
        onChange={(e) => setpasswordReInput(e.target.value)}
      />
      <br />
      <br />
      <br />
      <label id="shpass">Show password</label>
      <input
        id="check"
        type="checkbox"
        onClick={() => {
          if (type === "password") setType("text");
          else setType("password");
        }}
      />

      <br />
      <br />
      <br />
      {!reg.test(passwordInput) && (
        <div style={{ color: "red" }}>Password should contain a number </div>
      )}
      <br />
      {passwordReInput && (
        <div>
          {passwordReInput !== passwordInput && (
            <div style={{ color: "red" }}> Error! Try matching password </div>
          )}
        </div>
      )}
      <br />
      <Link to="/login">
        <button className="LoginButton">Back to Login</button>
      </Link>
      <button
        className="SignupButton"
        onClick={() => {
          setResponseFromDB();
        }}
      >
        Sign Up
      </button>
      <span style={{ color: "green", display: userAdded }}>
        User Added in database
        <span role="img" aria-labelledby="emoji">
          ✅
        </span>
      </span>
    </div>
  );
}
