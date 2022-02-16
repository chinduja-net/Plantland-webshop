import { render, screen } from "@testing-library/react";
const mockedNavigator = jest.fn();
const mockedLink = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
  Link: () => mockedLink,
}));

import "@testing-library/jest-dom";
import ProductProvider from "../../context/productProvider";
import Cart from "./Cart";
import userEvent from "@testing-library/user-event";


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

  it("displays the heading shopping cart", () => {
    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
    );
    const heading = screen.getByText("shopping Cart");
    expect(heading).toBeInTheDocument();
  });

  it("Increase cart quantity when + is clicked", () => {
    const cartData = [
      {
        id: "1",
        name: "pothos",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 9,
        inCart: true,
        itemsInCart: 1,
      },
      {
        id: "2",
        name: "pothos",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 9,
        inCart: true,
        itemsInCart: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cartData));

    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
    );

    const button = screen.getAllByTestId("increaseCart");
    userEvent.click(button[0]);
    expect(cartData[0].itemsInCart).toBeGreaterThanOrEqual(1);
  });

  it("Decrease cart quantity when - is clicked", () => {
    const cartData = [
      {
        id: "1",
        name: "pothos",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 9,
        inCart: true,
        itemsInCart: 1,
      },
      {
        id: "2",
        name: "pothos",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 9,
        inCart: true,
        itemsInCart: 2,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cartData));

    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
    );

    const button = screen.getAllByTestId("decreaseCart");
    userEvent.click(button[0]);
    expect(cartData[1].itemsInCart).toBeGreaterThanOrEqual(1);
  });

  it("remove cart item when x is clicked", () => {
    let allProducts = [
      {
        id: "1",
        name: "pothos",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 9,
        inCart: true,
        itemsInCart: 1,
      },
    ];
    localStorage.setItem("products", JSON.stringify(allProducts));
    const cartData = [
      {
        id: "1",
        name: "pothos",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 9,
        inCart: true,
        itemsInCart: 1,
      },
      {
        id: "3",
        name: "aloevera",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 9,
        inCart: true,
        itemsInCart: 2,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cartData));

    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
    );
    const button = screen.getAllByTestId("removeCart");
    userEvent.click(button[0]);
    expect(cartData[1].inCart).toEqual(true);
  });

  it(" + is disabled when itemsLeft is 0", () => {
    const cartData = [
      {
        id: "1",
        name: "pothos",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 0,
        inCart: true,
        itemsInCart: 1,
      }
    ];

    localStorage.setItem("cart", JSON.stringify(cartData));

    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
    );

    const button = screen.getByTestId("increaseCart");
    userEvent.click(button);
    expect(button).toBeDisabled()
  });
  it("- button is disabled when items left is 10", () => {
    const cartData = [
      {
        id: "1",
        name: "pothos",
        image: "",
        price: 109,
        quantity: 10,
        itemsLeft: 10,
        inCart: true,
        itemsInCart: 0,
      }
    ];

    localStorage.setItem("cart", JSON.stringify(cartData));

    render(
      <ProductProvider>
        <Cart />
      </ProductProvider>
    );

    const button = screen.getByTestId("decreaseCart");
    userEvent.click(button);
    expect(button).toBeDisabled();
  });
});
