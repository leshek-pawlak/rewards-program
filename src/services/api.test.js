import { fetchTransactions } from "./api";

describe("fetchTransactions", () => {
  beforeEach(() => {
    fetch.doMock();
  });

  test("fetches transactions successfully", async () => {
    const mockTransactions = [
      { id: 1, amount: 120, date: "2022-01-01" },
      { id: 2, amount: 75, date: "2022-01-15" },
      { id: 3, amount: 200, date: "2022-02-01" },
    ];

    fetch.mockResponseOnce(JSON.stringify(mockTransactions));
    const result = await fetchTransactions();
    expect(result).toEqual(mockTransactions);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${window.location.origin}/data/transactions.json`
    );
  });

  test("throws an error if the server returns a non-200 status code", async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(fetchTransactions()).rejects.toThrow("HTTP error status: 500");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${window.location.origin}/data/transactions.json`
    );
  });

  test("throws an error if the fetch fails", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    await expect(fetchTransactions()).rejects.toThrow(
      "Fetching error: API is down"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${window.location.origin}/data/transactions.json`
    );
  });
});
