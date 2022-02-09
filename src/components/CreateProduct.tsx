import React, { useState, useEffect } from "react";
import { Props } from "../assets/props";

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState<Blob[]>([]);
  const [imageURL, setImageURL] = useState<any>("");

  const newProduct: Props = {
    id: "hkhlk",
    name: name,
    image: imageURL,
    price: price,
    quantity: quantity,
    itemsLeft: quantity,
    inCart: false,
    itemsInCart: 0,
  };
  let newAddProduct: Array<object> | null = [];
  const addProduct = () => {
    let products = localStorage.getItem("products");
    if (products) {
      newAddProduct = JSON.parse(products);
      newAddProduct?.push(newProduct);
      localStorage.setItem("products", JSON.stringify(newAddProduct));
    } else {
      localStorage.setItem("products", JSON.stringify(newProduct));
    }
  };
  function uploadImage(e: any) {
    setImage([...e.target.files]);
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
  }
  return (
    <div>
      <label htmlFor="">
        Product Name
        <input
          type="text"
          placeholder="Enter Product Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label htmlFor="">
        Product Price
        <input
          type="number"
          placeholder="Enter Product Price"
          onChange={(e) => {
            setPrice(e.target.valueAsNumber);
          }}
        />
      </label>
      <label htmlFor="">
        Product Quantity
        <input
          type="number"
          placeholder="Enter Product quantity"
          onChange={(e) => {
            setQuantity(e.target.valueAsNumber);
          }}
        />
      </label>
      <div>
        <label>
          Select image:{" "}
          <input type="file" accept="image/*" onChange={uploadImage} />
        </label>
        <img src={imageURL} alt="" />
      </div>
      <button onClick={addProduct}>Create Product</button>
    </div>
  );
}

export default CreateProduct;
