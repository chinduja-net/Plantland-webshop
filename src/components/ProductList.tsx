import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/productProvider";
import productsData from "../assets/data";
import { Props, newProps } from "../assets/props";
import {user} from "../assets/users";



function ProductList() {
  const { setProducts, products, setCart, cart, searchInput, setSearchInput,setEditProduct } =
    useContext(ProductContext);
    const navigate = useNavigate();

  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(productsData));
    setProducts(productsData);
  }

 

  useEffect(() => {
    if (localStorage.getItem("products")) {
      let allProducts = JSON.parse(localStorage.getItem("products") || "");
      setProducts(allProducts);
    }
  }, []);

  let filteredProduct = !searchInput
    ? products
    : products.filter((product: Props) =>
        product.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
      );

  const handleAddToCart = (
    index: number,
    id: string,
    itemsInCart: number,
    itemsLeft: number
  ) => {
    handleDisable(index);
    itemsLeft -= 1;
    itemsInCart += 1;
    const cartProduct = products.filter(
      (product: Props) => product.id === id
    )[0];

    cartProduct.inCart = true;
    cartProduct.itemsLeft = itemsLeft;
    cartProduct.itemsInCart = itemsInCart;
    let updatedCart = [...cart, cartProduct];
    if (sessionStorage.getItem("Role")) {
      user[0].cart = updatedCart;
      sessionStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("cart", JSON.stringify(updatedCart))
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setCart(updatedCart);
  };
  const handleDisable = (index: number) => {
    let productsStorage = JSON.parse(localStorage.getItem("products") || "");
    let clickedProduct = productsStorage[index];
    clickedProduct.inCart = true;
    let copy = productsStorage.slice();
    copy[index] = clickedProduct;
    console.log(copy);

    localStorage.setItem("products", JSON.stringify(copy));
    setProducts(copy);
  };
const handleAdminDelete = (id : string) => {

  let allProducts = JSON.parse(localStorage.getItem('products') || '')
  let removedProduct =allProducts.filter((p : newProps) => p.id !== id)
  localStorage.setItem('products', JSON.stringify(removedProduct))
  setProducts(removedProduct)

}
const handleAdminEdit  = (product : newProps) => {
  console.log(product);
  setEditProduct(product)
  navigate('/editProduct')
} 
  return (
    <article>
      <Input
        type="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for products..."
      />
      <Title>Products</Title>
      <Section>
        {filteredProduct
          ? filteredProduct.map((product: any, index: number) => {
              return (
                <ul key={product.id}>
                  <List>
                    <Image src={product.image} alt="plant in a pot" />
                    <h3>{product.name}</h3>
                    <p>{product.price} kr</p>
                    <BUTTON
                      disabled={product.inCart}
                      onClick={() => {
                        handleAddToCart(
                          index,
                          product.id,
                          product.itemsInCart,
                          product.itemsLeft
                        );
                      }}
                    >
                      To cart
                    </BUTTON>
                    {product.created === 'new'? <><BUTTON onClick = {  () =>handleAdminDelete(product.id)}>delete</BUTTON><BUTTON onClick = {() => handleAdminEdit(product)}>Edit</BUTTON></> : null}
                    
                  </List>
                </ul>
              );
            })
          : null}
      </Section>
    </article>

  );
}

export default ProductList;

const Input = styled.input`
  width: 500px;
  
`;

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color:#3A6B35;
  text-transform: uppercase;
`;

const Image = styled.img`
  height: 250px;
  width: 150px;
  box-shadow: 1px 1px #3A6B35;
  &:hover {
   
  }
`;
const Section = styled.section`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
`;
const List = styled.li`
  list-style-type: none;
`;

const BUTTON = styled.button`
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
