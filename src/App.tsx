import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Login from "./components/Login";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import { BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />}/>
       
              <Route path="/cart" element={<Cart />}/>
              <Route path="/createProduct" element = {<CreateProduct/>}/>
              <Route path="/editProduct" element = {<EditProduct/>}/>
             
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
