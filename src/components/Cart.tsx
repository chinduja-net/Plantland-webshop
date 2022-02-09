import React, { useContext, useEffect } from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { ProductContext } from "../context/productProvider";
import { PropsCart } from "../assets/props";
import { Props } from "../assets/props";

import {user} from "../assets/users";

function Cart() {
  const {
    cart,
    setCart,
    setProducts,
    isOpen,
    setIsOpen,
    name,
    address,
    setAddress,
    setName,
  } = useContext(ProductContext);

  function toggleModal(e: any) {
    setIsOpen(!isOpen);
  }
  let userCart = sessionStorage.getItem("User")
    ? JSON.parse(sessionStorage.getItem("User") || "")[0].cart
    : null;

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      let allCart = JSON.parse(localStorage.getItem("cart") || "") || userCart;
      setCart(allCart);
    } else return;
  }, [setCart, userCart]);

  const handleIncreaseCartQuantity = (
    itemsLeft: number,
    id: string,
    itemsInCart: number
  ) => {
    itemsLeft -= 1;
    itemsInCart += 1;
    let allCartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "")
      : userCart;
    console.log(allCartItems);
    let clickedCart = allCartItems.filter((c: PropsCart) => c.id === id)[0];

    clickedCart.itemsInCart = itemsInCart;
    clickedCart.itemsLeft = itemsLeft;
    console.log("clicked", clickedCart);

    let index = allCartItems.findIndex((c: PropsCart) => c.id === id);
    let updatedCart = allCartItems.slice();
    updatedCart[index] = clickedCart;
    if (sessionStorage.getItem("Role")) {
      user[0].cart = updatedCart;
      sessionStorage.setItem("User", JSON.stringify(user));
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setCart(updatedCart);
  };

  const handleDecreaseCartQuantity = (
    itemsLeft: number,
    id: string,
    itemsInCart: number
  ) => {
    itemsLeft += 1;
    itemsInCart -= 1;
    let allCartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "")
      : userCart;
    let clickedCart = allCartItems.filter((c: PropsCart) => c.id === id)[0];

    clickedCart.itemsInCart = itemsInCart;
    clickedCart.itemsLeft = itemsLeft;
    console.log("clicked", clickedCart);
    let index = allCartItems.findIndex((c: PropsCart) => c.id === id);
    let updatedCart = allCartItems.slice();
    updatedCart[index] = clickedCart;

    if (sessionStorage.getItem("Role")) {
      user[0].cart = updatedCart;
      sessionStorage.setItem("User", JSON.stringify(user));
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    setCart(updatedCart);
  };
  const handleRemoveCartItem = (id: string) => {
    let allCartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "")
      : userCart;
    let index = allCartItems.findIndex((c: PropsCart) => c.id === id);
    console.log(index);
    let updatedCart = allCartItems.slice();
    updatedCart.splice(index, 1);
    console.log(updatedCart);
    if (sessionStorage.getItem("Role")) {
      user[0].cart = updatedCart;
      sessionStorage.setItem("User", JSON.stringify(user));
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setCart(updatedCart);

    /* ------------------------------------------------------ */
    let allProducts = JSON.parse(localStorage.getItem("products") || "");
    let removedProduct = allProducts.filter((p: Props) => p.id === id)[0];
    removedProduct.inCart = false;
    console.log(removedProduct);
    let removedIndex = allProducts.findIndex((p: Props) => p.id === id);
    const copy = allProducts.slice();
    copy[removedIndex] = removedProduct;
    localStorage.setItem("products", JSON.stringify(copy));
    setProducts(copy);
  };
  return (
    <>
      <section>
        {sessionStorage.getItem("Role") === "user" ? (
          <div>
            <p>Name :{user[0].name}</p>
            <p>Shipping Address:{user[0].address}</p>
          </div>
        ) : (
          <div>
            <button onClick={toggleModal}>Not Registered?</button>

            <ModalProvider>
              <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal}>
                <form>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name.."
                  />
                  <textarea
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Your Address.."
                  />
                  <button onClick={toggleModal}>save me</button>
                </form>
                
              </StyledModal>
            </ModalProvider>
            <p>{name}</p>
            <p>{address}</p>
          </div>
        )}
      </section>
      <h3>shopping Cart</h3>
      <section>
        {cart
          ? cart.map((cartItem: PropsCart) => {
              return (
                <List key={cartItem.id}>
                  <Image src={cartItem.image} />
                  <Para>{cartItem.name}</Para>
                  <Button
                    disabled={cartItem.itemsLeft === 0}
                    onClick={() =>
                      handleIncreaseCartQuantity(
                        cartItem.itemsLeft,
                        cartItem.id,
                        cartItem.itemsInCart
                      )
                    }
                  >
                    +
                  </Button>
                  <Span>{cartItem.itemsInCart} </Span>
                  <Button
                    disabled={cartItem.itemsLeft === 10}
                    onClick={() =>
                      handleDecreaseCartQuantity(
                        cartItem.itemsLeft,
                        cartItem.id,
                        cartItem.itemsInCart
                      )
                    }
                  >
                    -
                  </Button>
                  <div>
                    <Para>
                      {cartItem.price} x {cartItem.itemsInCart}{" "}
                      {cartItem.price * cartItem.itemsInCart}{" "}
                    </Para>
                  </div>
                  <Button onClick={() => handleRemoveCartItem(cartItem.id)}>
                    remove
                  </Button>
                </List>
              );
            })
          : null}
      </section>
      <Link to="/">
        <BiHomeAlt />
      </Link>
    </>
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
const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white};`;
