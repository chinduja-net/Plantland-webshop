import { useContext, useEffect, useState } from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import styled from "styled-components";
import { ProductContext } from "../../context/productProvider";
import { PropsCart, Props } from "../../assets/props";
import { user } from "../../assets/users";

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

  let userCart =
    sessionStorage.getItem("User") &&
    JSON.parse(sessionStorage.getItem("User") || "")[0].cart;
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      let allCart =
        JSON.parse(localStorage.getItem("cart") || "") ||
        JSON.parse(sessionStorage.getItem("User") || "")[0].cart;
      setCart(allCart);
    } else return;
  },[]);

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
    } else {
      setTotalPrice(0);
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
    let clickedCart = allCartItems.filter((c: PropsCart) => c.id === id)[0];

    clickedCart.itemsInCart = itemsInCart;
    clickedCart.itemsLeft = itemsLeft;

    let index = allCartItems.findIndex((c: PropsCart) => c.id === id);
    let updatedCart = allCartItems.slice();
    updatedCart[index] = clickedCart;
    if (sessionStorage.getItem("Role")) {
      user[0].cart = updatedCart;
      sessionStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
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
    let index = allCartItems.findIndex((c: PropsCart) => c.id === id);
    let updatedCart = allCartItems.slice();
    updatedCart[index] = clickedCart;

    if (sessionStorage.getItem("Role")) {
      user[0].cart = updatedCart;
      sessionStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
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

    let updatedCart = allCartItems.slice();
    updatedCart.splice(index, 1);

    if (sessionStorage.getItem("Role")) {
      user[0].cart = updatedCart;
      sessionStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setCart(updatedCart);

    /* ------------------------------------------------------ */
    let allProducts =
      localStorage.getItem("products") &&
      JSON.parse(localStorage.getItem("products") || "");
    let removedProduct = allProducts.filter((p: Props) => p.id === id)[0];
    removedProduct.inCart = false;
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
          <Addressdiv>
            <p>Name :{user[0].name}</p>
            <p>Shipping Address:{user[0].address}</p>
          </Addressdiv>
        ) : (
          <div>
            <Button onClick={toggleModal}>Not Registered?</Button>

            <ModalProvider>
              <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal}>
                <Form>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name.."
                  />
                  <TextArea
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Your Address.."
                  />
                  <Button onClick={toggleModal}>shop As Guest</Button>
                </Form>
              </StyledModal>
            </ModalProvider>
            <Addressdiv>
              <p>{name}</p>
              <p>{address}</p>
            </Addressdiv>
          </div>
        )}
      </Wrapper>
      <Heading>shopping Cart</Heading>

      <Cartsection>
        <Table>
          <tr>cart items</tr>

          <tr>price</tr>
          <tr>subtotal</tr>
        </Table>
        {cart
          ? cart.map((cartItem: PropsCart) => {
              return (
                <List key={cartItem.id}>
                  <Image src={cartItem.image} />
                  <Para>{cartItem.name}</Para>
                  <ButtonDiv>
                    <Button
                      data-testid="increaseCart"
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
                      data-testid="decreaseCart"
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
                  </ButtonDiv>
                  <Para>{cartItem.itemsLeft} left</Para>
                  <Button
                    data-testid="removeCart"
                    onClick={() => handleRemoveCartItem(cartItem.id)}
                  >
                    x
                  </Button>

                  <Para>{cartItem.price} kr</Para>
                  <Para>{cartItem.price * cartItem.itemsInCart} kr</Para>
                </List>
              );
            })
          : null}
        <div>
          <TotalPara>Total : {totalPrice} kr</TotalPara>
        </div>
      </Cartsection>
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
  justify-content: space-evenly;
  gap: 20px;
  align-items: center;
`;
const Cartsection = styled.section`
  border: 1px dashed #3a6b35;
  border-radius: 5px;
  width: 700px;
  padding: 10px;
  text-align: center;
`;
const List = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style-type: none;
  padding: 5px;
  text-transform: uppercase;
`;
const Para = styled.p`
  width: 100px;
  font-size: 0.8rem;
`;

const ButtonDiv = styled.div`
  width: 100px;
  font-size: 0.8rem;
`;
const Button = styled.button`
  font-size: 0.7rem;
  text-align: center;
  text-transform: uppercase;
  display: inline-block;
  background-color: #cbd18f;
  border-radius: 3px;
  border: 1.5px solid #3a6b35;
  cursor: pointer;
`;
const Image = styled.img`
  height: 50px;
  width: 50px;
  box-shadow: 1px 1px #3a6b35;
`;

const Span = styled.span`
  font-size: small;
`;

const Addressdiv = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  box-shadow: 0.5px 0.5px 5px #3a6b35;
`;
const Input = styled.input`
  width: 200px;
`;
const TextArea = styled.textarea`
  width: 200px;
  height: 250px;
  
`;
const TotalPara = styled.div`
  display: flex;
  font-size: 0.8rem;
  justify-content: flex-end;
  text-transform: uppercase;
  margin-right: 30px;
`;
const StyledModal = Modal.styled`
  width: 20rem;
  height: 30rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:10%;
  background-color: #cbd18f;`;

const Table = styled.table`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  font-size: 0.8rem;
  text-transform: uppercase;
  justify-content: space-evenly;
  width: 700px;
  padding: 10px;
  text-decoration: bold;
`;
