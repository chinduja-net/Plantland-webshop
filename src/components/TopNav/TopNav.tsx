import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ShoppingCart } from "@styled-icons/entypo";

function Nav() {
  const handleLogout = () => {
    sessionStorage.removeItem("Role");
    sessionStorage.removeItem("User");
    localStorage.removeItem("products");
    localStorage.removeItem("cart");
    window.alert("logged out successfully!");
  };

  const handleAdminLogout = () => {

    sessionStorage.removeItem("Role");
    localStorage.removeItem("products");
  }

  return (
    <Div>
      
      <Link to="/login">
        {sessionStorage.getItem("Role") === "user" ? (
          <Button onClick={handleLogout}>LOGOUT</Button>
        ) : (
          <Button data-testid ="login">USER LOGIN</Button>
        )}
      </Link>
      <Link to="/cart">
        <ShoppingCart
          size="24"
          style={{
            color: "#3A6B35",
            margin: "0 7px 0 7px",
          }}
        />
      </Link>
     
      <Link to = "/login">{ sessionStorage.getItem('Role') === "admin" ? <Button onClick={handleAdminLogout}>ADMIN LOGOUT</Button> :
        <Button>ADMIN LOGIN</Button>}</Link>
    </Div>
  );
}

export default Nav;

const Div = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  justify-items: space-evenly;
  align-items: center;
  margin-top: 15px;
`;
const Button = styled.button`
  font-size: 0.7rem;
  text-align: center;
  text-transform:uppercase;
  display: inline-block;
  background-color: #CBD18F;
  width: max-content;
  border-radius:3px;
  border: 1.5px solid #3a6b35;
  cursor: pointer;
  &:disabled {
    background-color:#b8a7a7;
    opacity: 0.7;
    cursor: default;
  }
`;