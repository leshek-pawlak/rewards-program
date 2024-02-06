import groupedTransactions from "./groupedTransactions";

describe("groupedTransactions", () => {
  test("groups transactions by customerId and sorts them by date", () => {
    const transactions = [
      { id: 1, amount: 120, date: "2022-01-02", customerId: "1" },
      { id: 2, amount: 75, date: "2022-01-01", customerId: "1" },
      { id: 3, amount: 200, date: "2022-02-01", customerId: "2" },
    ];

    const expected = {
      1: [
        { id: 2, amount: 75, date: "2022-01-01", customerId: "1" },
        { id: 1, amount: 120, date: "2022-01-02", customerId: "1" },
      ],
      2: [{ id: 3, amount: 200, date: "2022-02-01", customerId: "2" }],
    };

    expect(groupedTransactions(transactions)).toEqual(expected);
  });

  test("returns an empty object if no transactions are provided", () => {
    expect(groupedTransactions([])).toEqual({});
  });
});
