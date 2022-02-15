import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { newProps } from "../../assets/props";
import { nanoid } from "nanoid";
import { ProductContext } from "../../context/productProvider";
import productsData from "../../assets/data";

function CreateProduct() {
  const { setProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState<Blob[]>([]);
  const [imageURL, setImageURL] = useState<any>("");

  const newProduct: newProps = {
    id: nanoid(),
    name: name,
    image: imageURL,
    price: price,
    quantity: quantity,
    itemsLeft: quantity,
    inCart: false,
    itemsInCart: 0,
    created: "new",
  };
  let newAddProduct: Array<object> | null = [];
  const addProduct = () => {
    sessionStorage.setItem("Role", "admin");
    let products = localStorage.getItem("products");
    if (products) {
      newAddProduct = JSON.parse(products);
      newAddProduct?.push(newProduct);
      localStorage.setItem("products", JSON.stringify(newAddProduct));
      setProducts(newAddProduct);
      productsData.push(newProduct);
      console.log(productsData);
    } else {
      localStorage.setItem("products", JSON.stringify(newProduct));
    }
    navigate("/");
  };
  function uploadImage(e: any) {
    setImage([...e.target.files]);
  }
  useEffect(() => {
    if (image.length < 1) {
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(image[0]);

    reader.onload = function () {
      setImageURL(reader.result);
    };
  }, [image]);

  return (
    <Form>
      <Title>ADD NEW PRODUCT</Title>
      <Label htmlFor="">Product Name </Label>
      <Input
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <Label htmlFor="">Product Price </Label>
      <Input
        type="number"
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.valueAsNumber);
        }}
      />

      <Label htmlFor="">Product Quantity </Label>
      <Input
        type="number"
        placeholder="Enter Product quantity"
        onChange={(e) => {
          setQuantity(e.target.valueAsNumber);
        }}
      />

      <Label>Select image: </Label>
      <Input type="file" accept="image/*" onChange={uploadImage} />
      <Div>
        <Image src={imageURL} alt="plant in a pot" />

        <Button
          disabled={!name || !price || !quantity || !image || !imageURL}
          onClick={addProduct}
        >
          Create Product
        </Button>
      </Div>
    </Form>
  );
}

export default CreateProduct;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
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
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  font-size: 0.8rem;
  text-transform: uppercase;
  width: 200px;
`;

const Title = styled.h3`
  font-size: 1.2em;
  text-align: center;
  color: #3a6b35;
  text-transform: uppercase;
`;
const Input = styled.input`
  width: 400px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
`;
