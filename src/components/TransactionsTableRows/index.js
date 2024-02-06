import React, { useCallback } from "react";
import calculatePoints from "../../utilities/calculatePoints";
import "./index.css";

export default function TransactionsTableRows({ transactions }) {
  const calculatePointsPerMonth = useCallback(
    ({ transaction, index }) => {
      const month = new Date(transaction.date).getMonth() + 1;
      const isLastTransactionOfMonth =
        index === transactions.length - 1 ||
        new Date(transactions[index + 1].date).getMonth() + 1 !== month;
      return isLastTransactionOfMonth
        ? transactions
            .filter((t) => new Date(t.date).getMonth() + 1 === month)
            .reduce((total, t) => total + calculatePoints(t.amount), 0)
        : null;
    },
    [transactions]
  );

  if (!transactions || !transactions.length) return null;

  return transactions.map((transaction, index) => {
    const points = calculatePoints(transaction.amount);
    const pointsPerMonth = calculatePointsPerMonth({ transaction, index });

    return (
      <tr key={transaction.id}>
        <td>{transaction.date}</td>
        <td>{transaction.amount}</td>
        <td>{points}</td>
        <td>{pointsPerMonth}</td>
      </tr>
    );
  });
}
