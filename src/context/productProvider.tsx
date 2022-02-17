import React, { useState, createContext } from "react";
import { Props } from "../assets/props";
import { newProps } from "../assets/props";

export interface ProviderType {
  products: Props;
  cart: Props;
  setCart: any;
  setProducts: any;
}

export const ProductContext = createContext<ProviderType | any>([]);

export default function ProductProvider(props: any) {
  const [products, setProducts] = useState<Props | []>([]);

  const [cart, setCart] = useState<Props | []>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [editProduct, setEditProduct] = useState<newProps>();

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        searchInput,
        setSearchInput,
        isOpen,
        setIsOpen,
        name,
        setName,
        address,
        setAddress,
        editProduct,
        setEditProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
