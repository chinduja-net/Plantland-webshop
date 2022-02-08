jest.mock("React", () => ({
  ...jest.requireActual("React"),
  useEffect: jest.fn(),
}));

import { render, screen, within } from "@testing-library/react";
import ProductList from "./ProductList";
import userEvent from "@testing-library/user-event"

describe("Testing ProductList Component", () => {
  render(<ProductList />);
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

describe('searchbar', () => {
  it('is empty initially', () => {
      render(<ProductList/>)
      const input = screen.getByPlaceholderText('Search for products')
      expect(input).toHaveValue('')
  })

  

})