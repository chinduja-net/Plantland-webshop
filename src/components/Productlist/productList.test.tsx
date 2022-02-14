const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("React", () => ({
  ...jest.requireActual("React"),
  useEffect: jest.fn(),
}));

import { render, screen} from "@testing-library/react";
import ProductList from "./ProductList";

import ProductProvider from "../../context/productProvider";


describe("Testing ProductList Component", () => {
  render(
    <ProductProvider>
      <ProductList />
    </ProductProvider>
  );
  it("renders without crashing", () => {
    render(<ProductList />);
  });
  it("displays the title `Products`", () => {
    render(<ProductList />);
    const heading = screen.getByText("Products");
    expect(heading).toBeInTheDocument();
  });

  it("renders product name, image, price in each card", () => {
    render(<ProductList />);
    const productsData = {
      id: "1",
      name: "",
      image: "",
      price: "",
    };
    const name = screen.queryAllByText(
      productsData.name
    )[1] as HTMLAnchorElement;
    expect(name).toBeInTheDocument();
    const image = screen.queryAllByText(
      productsData.image
    )[2] as HTMLAnchorElement;
    expect(image).toBeInTheDocument();
    const price = screen.queryAllByText(
      productsData.price
    )[3] as HTMLAnchorElement;
    expect(price).toBeInTheDocument();
  });
});

describe("searchbar", () => {
  it("is empty initially", () => {
    render(<ProductList />);
    const input = screen.getByPlaceholderText("Search for products...");
    expect(input).toHaveValue("");
  });

  it("should have placeholder text", () => {
    render(<ProductList />);
    const input = screen.getByPlaceholderText("Search for products...");
    expect(input).toBeInTheDocument();
  });
});
