import React from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from 'react-icons/bs';

function Nav() {
  return (
    <div>
      <Link to="/login">
        <button>LOGIN</button>
      </Link>
      <Link to="/cart">
        <BsCartPlus/>
      </Link>
    </div>
  );
}

export default Nav;
