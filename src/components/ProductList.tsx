import { useContext, useEffect} from "react";
import styled from "styled-components";
import { ProductContext } from "../context/productProvider";
import productsData from "../assets/data";
import { Props } from "../assets/props";


function ProductList() {
  const { setProducts, products, setCart, cart, searchInput, setSearchInput } =
    useContext(ProductContext);
  
  localStorage.setItem("products", JSON.stringify(productsData));

  useEffect(() => {
    let allProducts = JSON.parse(localStorage.getItem("products") || "");
    setProducts(allProducts);
  }, [setProducts]);

  let filteredProduct = !searchInput
    ? products
    : products.filter((product: Props) =>
        product.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
      );

  const handleAddToCart = (id: string, e: any, quantity: number) => {
    quantity-=1;
    e.target.disabled = true;
    const cartProduct = products.filter(
      (product: Props) => product.id === id
    )[0];
    
    cartProduct.inCart = true;
    cartProduct.itemsLeft = quantity;
    console.log(cartProduct);
    let updatedCart = [...cart, cartProduct];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };
  

  return (
    <article>
    
      <Input
        type="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for products"
      />
      <Title>Products</Title>
      <Section>
        {filteredProduct
          ? filteredProduct.map((product: any) => {
              return (
                <List key={product.id}>
                  <Image src={product.image} alt="plant in a pot" />
                  <h3>{product.name}</h3>
                  <p>{product.price} kr</p>
                  <BUTTON
                    disabled={false}
                    onClick={(e) => {
                      handleAddToCart(product.id, e, product.quantity);
                    }}
                  >
                    To cart
                  </BUTTON>
                </List>
              );
            })
          : null}
      </Section>
    </article>
  );
}

export default ProductList;

const Input = styled.input`
width: 300px;

`

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: #628a63;
`;

const Image = styled.img`
  height: 250px;
  width: 150px;
  box-shadow: 1px 1px #628a63;
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
  text-decoration: none;
  display: inline-block;
  background-color: #4caf50;
  width: max-content;
`;
