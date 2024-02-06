import { lazy, useCallback } from "react";
import calculatePoints from "../../utilities/calculatePoints";
import groupedTransactions from "../../utilities/groupedTransactions";
import "./index.css";
import Loading from "../Loading";

const TransactionsTableRows = lazy(() => import("../TransactionsTableRows"));

export default function TransactionsTable({ transactions }) {
  const renderTotalPoints = useCallback((transactions) => {
    return transactions.reduce(
      (total, t) => total + calculatePoints(t.amount),
      0
    );
  }, []);

  if (!transactions || !transactions.length) return <Loading />;

  const groupedAndSortedTransactions = groupedTransactions(transactions);

  return (
    <div data-testid="table-wrapper">
      {Object.entries(groupedAndSortedTransactions).map(
        ([customerId, transactions]) => (
          <div key={customerId}>
            <h2>Customer ID: {customerId}</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Points</th>
                  <th>Points per Month</th>
                </tr>
              </thead>
              <tbody>
                <TransactionsTableRows transactions={transactions} />
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Total Points</td>
                  <td colSpan="2">{renderTotalPoints(transactions)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )
      )}
    </div>
  );
}
