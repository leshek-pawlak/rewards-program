import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionsTableRows from "./index";
import calculatePoints from "../../utilities/calculatePoints";

jest.mock("../../utilities/calculatePoints");

describe("TransactionsTableRows", () => {
  const transactions = [
    { id: 1, amount: 120, date: "2022-01-01" },
    { id: 2, amount: 75, date: "2022-01-15" },
    { id: 3, amount: 200, date: "2022-02-01" },
  ];

  function renderComponentInTable(transactions) {
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Points</th>
            <th>Points Per Month</th>
          </tr>
        </thead>
        <tbody>
          <TransactionsTableRows transactions={transactions} />
        </tbody>
      </table>
    );
  }

  test("renders correctly", () => {
    calculatePoints.mockReturnValue(50);
    render(renderComponentInTable(transactions));
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  test("calculates points per month correctly", () => {
    calculatePoints.mockImplementation((amount) => amount);
    render(renderComponentInTable(transactions));
    expect(screen.getByText("195")).toBeInTheDocument(); // 120 + 75 for January
    const elements200 = screen.getAllByText("200");
    expect(elements200.length).toBe(3);
    elements200.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test("does not render if transactions prop is not provided", () => {
    render(renderComponentInTable());
    expect(screen.queryByText("2022-01-01")).not.toBeInTheDocument();
  });

  test("does not render if transactions prop is an empty array", () => {
    render(renderComponentInTable([]));
    expect(screen.queryByText("2022-01-01")).not.toBeInTheDocument();
  });

  test("does not render if transactions prop is null", () => {
    render(renderComponentInTable(null));
    expect(screen.queryByText("2022-01-01")).not.toBeInTheDocument();
  });
});
