import React, { useContext, useEffect, useState } from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { ProductContext } from "../context/productProvider";
import { PropsCart } from "../assets/props";
import { Props } from "../assets/props";

import { user } from "../assets/users";

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
  const [totalPrice, setTotalPrice] = useState<Number>(0);

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

  useEffect(() => {
    addCartValue();
  });

  const addCartValue = () => {
    if (cart.length > 0) {
        const subTotal: Array<number> = cart.map((c: PropsCart) => {
        return c.price * c.itemsInCart;
      });

      let sum = 0;
      for (let i = 0; i < subTotal.length; i++) {
        sum += subTotal[i];
      }
      setTotalPrice(sum);
    }
  };
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
    <Article>
      <Wrapper>
        {sessionStorage.getItem("Role") === "user" ? (
          <div>
            <p>Name :{user[0].name}</p>
            <p>Shipping Address:{user[0].address}</p>
          </div>
        ) : (
          <div>
            <Button onClick={toggleModal}>Not Registered?</Button>

            <ModalProvider>
              <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal}>
                <Form>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name.."
                  />
                  <textarea
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Your Address.."
                  />
                  <Button onClick={toggleModal}>save</Button>
                </Form>
              </StyledModal>
            </ModalProvider>
            <Div>
              <p>{name}</p>
              <p>{address}</p>
            </Div>
          </div>
        )}
      </Wrapper>
      <Heading>shopping Cart</Heading>
      <Cartsection>
        {cart
          ? cart.map((cartItem: PropsCart) => {
              return (
                <List key={cartItem.id}>
                  <Image src={cartItem.image} />
                  <Para>{cartItem.name}</Para>
                  <div>
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
                  </div>
                  <Para>{cartItem.itemsLeft} left</Para>
                  <Button onClick={() => handleRemoveCartItem(cartItem.id)}>
                    x
                  </Button>

                  <Para>{cartItem.price} kr</Para>
                  <Para>{cartItem.price * cartItem.itemsInCart} kr</Para>
                </List>
              );
            })
          : null}
        <Para>Total : {totalPrice}</Para>
      </Cartsection>
      <Link to="/">
        <BiHomeAlt />
      </Link>
    </Article>
  );
}

export default Cart;

const Heading = styled.h3`
  text-transform: uppercase;
  color: #3a6b35;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.section``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Cartsection = styled.section`
  border: 1px dashed #3a6b35;
  border-radius: 5px;
  width: 700px;
  padding: 10px;
`;
const List = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style-type: none;
  padding: 5px;
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
  box-shadow: 1px 1px #3a6b35;
`;

const Span = styled.span`
  font-size: small;
`;

const Div = styled.div``;
const StyledModal = Modal.styled`
  width: 20rem;
  height: 10rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:10%;
  background-color: #a5a1a1;`;
