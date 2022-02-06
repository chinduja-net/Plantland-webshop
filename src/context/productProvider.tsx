import React, { useState, createContext} from "react";
import { Props } from "../assets/props";

export interface ProviderType{
  products : Props,
  cart :Props,
  setCart: any,
  setProducts :any

}

export const ProductContext = createContext<ProviderType | any>([]);

export default function ProductProvider(props : any){

  const [products, setProducts] = useState<Props | []>([])
 
  const [cart, setCart] = useState<Props | []>([])
  const [searchInput, setSearchInput] = useState<string>("");
  return(
    <ProductContext.Provider value= {{products, setProducts, cart, setCart,searchInput,setSearchInput}}>
    {props.children}
    </ProductContext.Provider>
  )
}