import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/productProvider";
import { PropsCart } from "../assets/props";
import styled from "styled-components";

function Cart() {
  const { cart, setCart } = useContext(ProductContext);
 useEffect(() => {
   if(localStorage.getItem('cart')){
    let allCart = JSON.parse(localStorage.getItem("cart") || '')
    setCart(allCart)
   }else
   return
    
  }, [setCart]); 
  return (
    <div>
      {cart
        ? cart.map((cartItem: PropsCart) => {
            return (
              <List key={cartItem.id}>
                <Para>{cartItem.name}</Para>
                <Para>{cartItem.price}kr</Para>
                <Image src={cartItem.image} />
                <Button>+</Button>
                <Span>{cartItem.itemsLeft} left</Span>
                <Button>-</Button>
              </List>
            );
          })
        : null}
    </div>
  );
}

export default Cart;
const List = styled.li`
list-style-type: none;
`
const Para = styled.p`
  font-size: 0.8rem;
`;
const Button = styled.button`
  font-size: 0.8rem;
`;
const Image = styled.img`
  height: 50px;
  width: 50px;
`;

const Span = styled.span`
  font-size: small;
`;
