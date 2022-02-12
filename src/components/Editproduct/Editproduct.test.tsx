import { render, screen } from "@testing-library/react";
import EditProduct from "./EditProduct";
import { newProps } from "../../assets/props";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

describe("Testing EditProduct Component", () => {
  it("renders without crashing", () => {
    const editProduct : newProps = {
      id: "",
      name: "",
      image: "",
      price: 100,
      quantity: 10,
      itemsLeft: 10,
      inCart: true,
      itemsInCart: 0,
      created: "",
    };

    render(<>

      <EditProduct/>
  
    
    </>);
  });
});
