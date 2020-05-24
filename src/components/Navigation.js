import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

import "materialize-css";

const Navigation = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div class="">
      <div class="nav-wrapper container">
        <a href="/" class="brand-logo  light-green-text text-darken-3">
          <i class="material-icons">home</i>
        </a>
        {!isAuthenticated && (
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <button
              class="waves-effect waves-light light-green darken-3 btn-small"
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </button>
          </ul>
        )}

        {isAuthenticated && (
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <button
              class="waves-effect waves-light light-green darken-3 btn-small"
              onClick={() => logout()}
            >
              Log out
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
