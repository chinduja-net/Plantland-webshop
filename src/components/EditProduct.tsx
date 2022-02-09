import { useState, useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { newProps } from "../assets/props";
import { ProductContext } from "../context/productProvider";


function EditProduct() {
  const{editProduct} = useContext(ProductContext);

  console.log(editProduct);
  
  const navigate = useNavigate()
  const [name, setName] = useState(editProduct.name);
  const [price, setPrice] = useState(editProduct.price);
  const [quantity, setQuantity] = useState<number>(editProduct.quantity);
  const [image, setImage] = useState<Blob[]>([]);
  const [imageURL, setImageURL] = useState<any>(editProduct.image);



  const newProduct: newProps = {
    id: editProduct.id,
    name: name,
    image: imageURL,
    price: price,
    quantity: quantity,
    itemsLeft: editProduct.itemsLeft,
    inCart: editProduct.inCart,
    itemsInCart:editProduct.itemsInCart,
    created:editProduct.created
  };
  let notAddedProduct: Array<object> | null = [];

  const changeProduct = () => {
    
    let products =JSON.parse( localStorage.getItem("products") || '');
    if (products) {
      notAddedProduct =(products).filter((p : newProps) => p.id !== editProduct.id)
      notAddedProduct?.push(newProduct)
      localStorage.setItem("products", JSON.stringify(notAddedProduct))
      
    } else{
      localStorage.setItem('products', JSON.stringify(newProduct))
    }
    navigate('/')
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
    <div>
       <label htmlFor="">
        Product Name
        <input
          type="text"
          value={name}
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
          value={price}
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
          value={quantity}
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
      <button onClick={changeProduct}>Edit Product</button> 
    </div>
  );
}

export default EditProduct;
