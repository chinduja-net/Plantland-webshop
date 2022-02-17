import { Link} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PropsCart } from "../../assets/props";
import { ShoppingCart } from "@styled-icons/entypo";
import { ProductContext } from "../../context/productProvider";

function Nav() {

  const { cart } = useContext(ProductContext);
  const [counter, setCounter] = useState<number>(0);

  localStorage.setItem("counter", JSON.stringify(counter));
  useEffect(() => {
    handlecounter();
  });
  const handlecounter = () => {
    const quantity = cart.map((c: PropsCart) => {
      return c.itemsInCart;
    });
    let count = 0;
    for (let i = 0; i < quantity.length; i++) {
      count += quantity[i];
      setCounter(count);
      localStorage.setItem("counter", JSON.stringify(count));
    }
  };
  const handleLogin = () => {
    sessionStorage.clear();
    localStorage.removeItem("cart");
    localStorage.removeItem("counter");
   
  }
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("cart");
    localStorage.removeItem("counter");
    window.alert("logged out succesfully!");
  };
  return (
    <>
      <Div>
      <Link to="/login">
        {!sessionStorage.getItem("Role")? 
          
            <Button data-testid="login" onClick = {handleLogin}>LOGIN</Button> 
           : 
            <Button onClick={handleLogout}>LOGOUT</Button>
            
          }
     </Link>
        
         
       
        {sessionStorage.getItem("Role") === "admin" ? null : (
          <Link to="/cart">
            <ShoppingCart
              data-testid="svg-shopping"
              size="28"
              style={{
                color: "#e3b448",
                margin: "0 35px 0 35px",
              }}
            />
            <Span>{counter}</Span>
          </Link>
        )}
      </Div>
      {/* <HeroImage src="https://images.unsplash.com/photo-1525898171639-bbf6bf5b3c93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/> */}
    </>
  );
}

export default Nav;

const Div = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #4c8b45;
  justify-content: flex-end;
  justify-items: space-evenly;
  align-items: center;
`;

const HeroImage = styled.img`
  background-attachment: fixed;
  background-position: center;
  width: 100%;
  height: 600px;
`;
const Button = styled.button`
  font-size: 1rem;
  text-align: center;
  text-transform: uppercase;
  display: inline-block;
  background-color: #cbd18f;
  width: max-content;
  border-radius: 3px;
  border: 1.5px solid #3a6b35;
  cursor: pointer;
`;
const Span = styled.span`
  line-height: 1;
  padding: 2px;
  position: absolute;
  top: 1px;
  right: 15px;
  border-radius: 50%;
  background-color: #e3b448;
  font-size: 0.8rem;
  color: #000;
  min-width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
