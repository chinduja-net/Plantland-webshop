import { render, screen,within} from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import Nav from "./TopNav";

jest.mock("React", () => ({
  ...jest.requireActual("React"),
  useEffect: jest.fn(),
}));

describe("testing nav component", () => {
  it("renders nav component without crashing", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
  });
  it("display logout button when there is Role in sessionStorage", () => {
    const history = createMemoryHistory();
    const role = "user";
    sessionStorage.setItem("Role", role);
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    sessionStorage.getItem("Role");
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    sessionStorage.clear();
    localStorage.clear();
      expect(history.location.pathname).toBe("/");
  });

  it("displays login button when there is no Role in sessionStorage", () => {
    sessionStorage.clear();
    localStorage.clear()
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );

    const button = screen.getByTestId("login");
    expect(button).toBeInTheDocument();
  
  });

  it("takes to cart page when cart icon is clicked", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );

   const shopping = screen.getByTestId("svg-shopping");
    expect(shopping).toBeInTheDocument();
     userEvent.click(shopping)
     
    const counter = screen.getByTestId("counter");
    userEvent.click(counter)
    
    expect(counter).toBeInTheDocument(); 
     const link = screen.getByTestId("link");
    
     userEvent.click(link)
     expect(history.location.pathname).toBe("/")
   
     
    
  });

  it("cart is shown when user is logged in", () => {
    const role = "user";
    sessionStorage.setItem("Role",role)
    render(<MemoryRouter>
        <Nav />
      </MemoryRouter>)

const shopping = screen.getByTestId("svg-shopping");

expect(shopping).toBeInTheDocument()
  }) 
});
