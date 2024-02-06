import { render, screen, waitFor } from "@testing-library/react";
import { fetchTransactions } from "../../services/api";
import App from "./index";

jest.mock("../../services/api");

describe("App", () => {
  it("handles fetchTransactions error", async () => {
    const error = new Error("Failed to fetch transactions");
    fetchTransactions.mockRejectedValueOnce(error);

    render(<App />);

    expect(fetchTransactions).toHaveBeenCalled();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
  it("renders transactions table after successful fetch", async () => {
    const mockTransactions = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
    ];
    fetchTransactions.mockResolvedValue(mockTransactions);

    render(<App />);

    await waitFor(() => expect(fetchTransactions).toHaveBeenCalledTimes(1));
    const tableElement = await screen.findByRole("table");
    expect(tableElement).toBeInTheDocument();
  });

  it("renders loading state initially", () => {
    const mockTransactions = new Promise(() => {});
    fetchTransactions.mockResolvedValue(mockTransactions);

    render(<App />);
    const loadingElement = screen.getByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
  });
});
