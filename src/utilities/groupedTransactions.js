export default function groupedTransactions(transactions) {
  // Group transactions by customerId
  const groupedAndSortedTransactions = transactions.reduce(
    (acc, transaction) => {
      const key = transaction.customerId;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(transaction);
      return acc;
    },
    {}
  );

  // Sort transactions by date
  for (let customerId in groupedAndSortedTransactions) {
    groupedAndSortedTransactions[customerId].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  return groupedAndSortedTransactions;
}
