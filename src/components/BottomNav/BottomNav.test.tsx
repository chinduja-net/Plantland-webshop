import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import BottomNav from "./BottomNav";

import "@testing-library/jest-dom";
/*  const mockedLink = jest.fn();

jest.mock("react-router-dom", () => ({
  Link: () => mockedLink,
}));
  */
describe("testing bottom nav componenet", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>
    );
  });

  it("navigates to home page", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator = {history}>
        <BottomNav />
      </Router>
    );
    const svg = screen.getByTestId("svg-element");
    userEvent.click(svg);
    expect(history.location.pathname).toBe("/");
  });
});
