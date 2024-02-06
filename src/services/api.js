export const fetchTransactions = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      // wait 2 seconds to simulate a slow network
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    const response = await fetch(
      `${window.location.origin}/data/transactions.json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Fetching error: ${error}`);
  }
};
