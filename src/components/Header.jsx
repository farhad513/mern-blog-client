import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { toogleTheme } from "../store/reducer/themeReducer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMessage, loading, userInfo } = useSelector(
    (state) => state.auth
  );
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-0 ">
        <div className="container">
          <NavLink to="/" className="navbar-brand mb-0">
            LOGO
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            {/* <form className="d-flex mx-auto  " role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center ">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="d-flex justify-content-center align-items-center">
              {/* <button
                onClick={() => dispatch(toogleTheme())}
                className="btn d-flex justify-content-center align-items-center rounded bg-transparent  border  border-dark "
              >
                <CiLight className="fs-5" />
              </button> */}
              {userInfo && userInfo ? (
                <button
                  className="btn btn-success ms-2"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  className="btn btn-success ms-2"
                  onClick={() => navigate("/register")}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
