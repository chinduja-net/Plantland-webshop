import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/login">
        <button>LOGIN</button>
      </Link>
      <Link to="/cart">
        <button>CART</button>
      </Link>
    </div>
  );
}

export default Nav;
