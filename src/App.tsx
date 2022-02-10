import React from "react";

import styled from "styled-components";
import ProductList from "./components/ProductList";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Login from "./components/Login";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Div>
      <Header>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/editProduct" element={<EditProduct />} />

            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <ProductList />
                </>
              }
            ></Route>
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
  background-color: #E3B448;
  min-height: 100vh;
  color: black;
  display:flex;
  justify-content:center;
  align-items:center;
`;
