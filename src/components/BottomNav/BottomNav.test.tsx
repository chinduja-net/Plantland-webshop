import {
  queryByRole,
  queryByTestId,
  render,
  screen,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import BottomNav from "./BottomNav";

import "@testing-library/jest-dom";
const mockedLink = jest.fn();

jest.mock("react-router-dom", () => ({
  Link: () => mockedLink,
}));

describe("testing bottom nav componenet", () => {
  it("renders without crashing", () => {
    render(<BottomNav />);
  });

  it("navigates to / when the user clicks home logo", () => {
    render(<BottomNav />);
    
  });
});
