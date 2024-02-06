import { useState, useEffect } from "react";
import { fetchTransactions } from "../../services/api";
import Loading from "../Loading";
import TransactionsTable from "../TransactionsTable";
import "./index.css";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  if (!transactions || !transactions.length) return <Loading />;

  return (
    <div className="app">
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
