import { render} from "@testing-library/react";
import EditProduct from "./EditProduct"
import ProductProvider from "../../context/productProvider";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigator,
}));

describe("Testing EditProduct Component", () => {
  it("renders without crashing", () => {
    
    render(
      <ProductProvider value = {EditProduct}>
     <EditProduct/>
      </ProductProvider>
    );
  });
});
