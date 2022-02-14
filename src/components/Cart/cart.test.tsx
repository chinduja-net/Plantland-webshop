import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const mockedNavigator = jest.fn();
const mockedLink = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
  Link: () => mockedLink,
}));

import "@testing-library/jest-dom";
import ProductProvider from "../../context/productProvider";
import Cart from "./Cart";

describe("Testing Cart Component", () => {
  it("renders without crashing", () => {
    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
    );
  });

  it("renders cart image price name price quantity", () => {
    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
    );
    const cartData = {
      id: "1",
      name: "",
      image: "",
      price: "",
      itemsLeft: "",
    };

    const name = screen.queryAllByText(cartData.name)[1] as HTMLAnchorElement;
    expect(name).toBeInTheDocument();
    const image = screen.queryAllByText(cartData.image)[2] as HTMLAnchorElement;
    expect(image).toBeInTheDocument();
    const price = screen.queryAllByText(cartData.price)[3] as HTMLAnchorElement;
    expect(price).toBeInTheDocument();
    const itemsLeft = screen.queryAllByText(
      cartData.image
    )[4] as HTMLAnchorElement;
    expect(itemsLeft).toBeInTheDocument();
  });

  it("Find the heading shopping cart",() => {
    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
       )
    const heading = screen.getByText("shopping Cart")
    expect(heading).toBeInTheDocument()
    
  });
});
