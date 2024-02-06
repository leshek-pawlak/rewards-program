import { render, screen } from "@testing-library/react";
import Loading from "./index";

test("renders loading spinner", () => {
  render(<Loading />);
  const spinnerElement = screen.getByTestId("loading");
  expect(spinnerElement).toBeInTheDocument();
});
