import { render, screen, waitFor } from "@testing-library/react";
import TransactionsTable from "./index";
import calculatePoints from "../../utilities/calculatePoints";
import groupedTransactions from "../../utilities/groupedTransactions";

jest.mock("../../utilities/calculatePoints");
jest.mock("../../utilities/groupedTransactions");

describe("TransactionsTable", () => {
  const transactions = [
    { id: 1, amount: 120, date: "2022-01-01", customerId: "1" },
    { id: 2, amount: 75, date: "2022-01-15", customerId: "1" },
    { id: 3, amount: 200, date: "2022-02-01", customerId: "2" },
  ];

  test("renders loading state if transactions prop is not provided", () => {
    render(<TransactionsTable />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("renders loading state if transactions prop is an empty array", () => {
    render(<TransactionsTable transactions={[]} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("renders transactions table if transactions prop is provided", async () => {
    calculatePoints.mockReturnValue(50);
    groupedTransactions.mockReturnValue({
      1: [transactions[0], transactions[1]],
      2: [transactions[2]],
    });

    render(<TransactionsTable transactions={transactions} />);

    await waitFor(() => {
      expect(screen.getByTestId("table-wrapper")).toBeInTheDocument();
    });

    expect(screen.getByText("Customer ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Customer ID: 2")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("2022-01-15")).toBeInTheDocument();
    const totalPointsElements = screen.getAllByText("Total Points");
    expect(totalPointsElements.length).toBe(2);
    totalPointsElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
