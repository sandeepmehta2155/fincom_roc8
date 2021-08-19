import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Login-Page/auth-context";

export function Header() {
  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const navigate = useNavigate();

  const { LogOut } = useAuth();

  function loginHandler() {
    username !== null ? LogOut() : navigate("login");
  }

  return (
    <>
      <header>
        <span className="name">Flanbieuto</span>

        <br />
        <Link to="/">
          <h2 className="headerHomeComponent">Home</h2>
        </Link>
        <Link to="/products">
          <h2 className="headerProductComponent">Products</h2>
        </Link>
        <Link to="/cart">
          <button className="cartButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              className="bi bi-cart3"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </Link>
        <Link to="/wishlist">
          <button className="wishlistButton">
            <svg className="wishList" fill="black" viewBox="2 2 30 30">
              <g>
                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
              </g>
            </svg>
          </button>
        </Link>

        <div
          onClick={() => loginHandler()}
          className="userProfileIcon"
          style={{ color: "black" }}
        >
          <span className="LogInOutButton">
            {username ? "Logout" : "Login"}
          </span>
          <button className="bi bi-person-circleButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 1 23 23"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
