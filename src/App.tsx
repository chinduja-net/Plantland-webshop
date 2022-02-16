import React from "react";
import styled from "styled-components";
import ProductList from "./components/Productlist/ProductList";
import BottomNav from "./components/BottomNav/BottomNav"
import Nav from "./components/TopNav/TopNav";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import CreateProduct from "./components/CreateProduct/CreateProduct"
import EditProduct from "./components/Editproduct/EditProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Div>
      <Header>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<><Login /> <BottomNav/></>} />
            <Route path="/cart" element={<><Cart /> <BottomNav/></>} />
            <Route path = "/createProduct" element = {<CreateProduct/>}/>
            <Route path="/editProduct" element={<EditProduct />} />
            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <ProductList />
               
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </Header>
    </Div>
  );
}

export default App;

const Div = styled.div`
  text-align: center;
`;
const Header = styled.header`
  background-color: #e3b448;
  min-height: 100vh;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
