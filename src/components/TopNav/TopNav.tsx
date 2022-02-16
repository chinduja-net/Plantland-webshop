import { Link } from "react-router-dom";
import styled from "styled-components";

import { ShoppingCart } from "@styled-icons/entypo";

function Nav() {
  const handleLogout = () => {
    /*   sessionStorage.removeItem("Role");
    localStorage.removeItem("cart");
    window.alert("logged out successfully!"); */
    sessionStorage.clear();
    localStorage.removeItem("cart");
  };
  return (
    <Div>
      <Link to="/login">
        {!sessionStorage.getItem("Role") ? (
          <Button data-testid="login">LOGIN</Button>
        ) : (
          <Button onClick={handleLogout}>LOGOUT</Button>
        )}
      </Link>
      {sessionStorage.getItem("Role") === "admin" ? null : (
        <Link to="/cart">
          <ShoppingCart
            data-testid="svg-shopping"
            size="24"
            style={{
              color: "#3A6B35",
              margin: "0 7px 0 7px",
            }}
          />
        </Link>
      )}
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
  text-transform: uppercase;
  display: inline-block;
  background-color: #cbd18f;
  width: max-content;
  border-radius: 3px;
  border: 1.5px solid #3a6b35;
  cursor: pointer;
  &:disabled {
    background-color: #b8a7a7;
    opacity: 0.7;
    cursor: default;
  }
`;
