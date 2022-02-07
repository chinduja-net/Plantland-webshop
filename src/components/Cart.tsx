import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/productProvider";
import { PropsCart } from "../assets/props";
import styled from "styled-components";

function Cart() {
  const { cart, setCart } = useContext(ProductContext);
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      let allCart = JSON.parse(localStorage.getItem("cart") || "");
      setCart(allCart);
    } else return;
  }, [setCart]);


  const handleIncreaseCartQuantity = (
    itemsLeft: number,
    id: string,
    itemsInCart: number
  ) => {
    itemsLeft -= 1;
    itemsInCart += 1;
    let allCartItems = JSON.parse(localStorage.getItem("cart") || "");
    let clickedCart = allCartItems.filter((c: PropsCart) => c.id === id)[0];

    clickedCart.itemsInCart = itemsInCart;
    clickedCart.itemsLeft = itemsLeft;
    console.log('clicked',clickedCart);
    let updatedCart = []
    updatedCart = allCartItems.filter(
      (c: PropsCart) => c.id !== clickedCart.id
    );
    
  updatedCart.unshift(clickedCart)
  console.log('replaced',updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart)
  
  };

  return (
    <div>
      {cart
        ? cart.map((cartItem: PropsCart) => {
            return (
              <List key={cartItem.id}>
                <Image src={cartItem.image} />
                <Para>{cartItem.name}</Para>
                <Button
                  onClick={(e) =>
                    handleIncreaseCartQuantity(
                      cartItem.itemsLeft,
                      cartItem.id,
                      cartItem.itemsInCart
                    )
                  }
                >
                  +
                </Button>
                <Span>{cartItem.itemsLeft} left</Span>
                <Button>-</Button>
                <div>
                  <Para>{cartItem.price} x {cartItem.itemsInCart}</Para>
                 
                </div>
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
`;
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
