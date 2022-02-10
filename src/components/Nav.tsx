import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {User} from "@styled-icons/boxicons-solid"
import { ShoppingCart } from "@styled-icons/entypo";

function Nav() {

  const handleLogout = () => {
    sessionStorage.removeItem("Role");
    sessionStorage.removeItem("User");
    localStorage.removeItem("products");
    localStorage.removeItem("cart");
    window.alert("logged out successfully!");
    
  };



  return (
    <Div>
      <Link to="/login">
        {sessionStorage.getItem('Role') === 'user' ? <button onClick={handleLogout }>LOGOUT</button> : <button>LOGIN</button> }
        
      </Link>
      <Link to="/cart">
        <ShoppingCart
          size="24"
          style={{
            color: "#3A6B35",
            padding:"0 0 0 5px",
          }}
        />
      </Link>
    </Div>
  );
}

export default Nav;

const Div = styled.div`
display:flex;
width:80%;
justify-content:flex-end;
justify-items:space-evenly;
align-items:center;
margin-top:15px;





`