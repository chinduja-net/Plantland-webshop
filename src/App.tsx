import React from "react";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import ProductList from "./components/ProductList";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />}></Route>
       
              <Route path="/cart" element={<Cart />}></Route>
             
            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <ProductList />
                </>
              }
            >
              
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
