import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditProduct from "./EditProduct";
import { ProductContext } from "../../context/productProvider";



const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));



describe("Testing EditProduct Component", () => {
  it("renders without crashing", () => {
    const editProduct = {
      id: "",
      name: "",
      image: "",
      price: 109,
      quantity: 9,
      itemsLeft: 9,
      inCart: false,
      itemsInCart: 1,
    };

    render(
      <ProductContext.Provider value={{ editProduct }}>
        <EditProduct />
      </ProductContext.Provider>
    );
  });

  it('has all labels to display', () => {
    const editProduct = {
      name: "",
      image: "",
      price: "",
      quantity: ""
    }
    render(
      <ProductContext.Provider value={{ editProduct }}>
        <EditProduct />
      </ProductContext.Provider>
    );
   
    const input = screen.getByPlaceholderText("Enter Product Name");
    expect(input).toBeInTheDocument()

    const price = screen.getByPlaceholderText("Enter Product Price");
    expect(price).toBeInTheDocument()

    const quantity = screen.getByPlaceholderText("Enter Product quantity");
    expect(quantity).toBeInTheDocument()

    const img = screen.getByAltText("plant in a pot");
    expect(img).toBeInTheDocument();

    const editButton = screen.getByRole("button")
    expect(editButton).toBeInTheDocument()
    userEvent.click(editButton)
   expect(mockedNavigator).toHaveBeenCalledWith("/")
    


  })
});
