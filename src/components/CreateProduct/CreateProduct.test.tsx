import { render,screen} from "@testing-library/react";
import CreateProduct from  "./CreateProduct"

const mockedNavigator = jest.fn();


jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedNavigator,
    
  }));

describe ('Testing createProduct componenet', () => {


it('renders without crashing', ()=> {

render (<CreateProduct/>)

})
it('renders all necessary input fields', () => {
  render(<CreateProduct/>)
  expect(screen.getByPlaceholderText('Enter Product Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter Product Price')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter Product quantity')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument()
})

})