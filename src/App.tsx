import { useEffect, useState } from "react";
import "./App.css";
import { calculateEURAmount, calculateSum, generateRandomId } from "./helpers";
import Table from "./components/Table";
import { Row } from "./types";

function App() {
  const [rows, setRows] = useState<Row[]>([
    {
      id: generateRandomId(),
      title: "New book about Rust",
      amountPLN: 100,
      amountEUR: 22.82,
      options: "Delete",
    },
    {
      id: generateRandomId(),
      title: "Snacks for a football match",
      amountPLN: 20,
      amountEUR: 4.56,
      options: "Delete",
    },
    {
      id: generateRandomId(),
      title: "Bus ticket",
      amountPLN: 2.55,
      amountEUR: 0.58,
      options: "Delete",
    },
  ]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(1);
  const [sum, setSum] = useState(calculateSum(rows));
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [eurConversionRate, setEurConversionRate] = useState(4.382);

  useEffect(() => {
    // calculate sum
    setSum(calculateSum(rows));
  }, [rows]);

  useEffect(() => {
    // update EUR amounts
    const newRows = rows.map((row) => ({
      ...row,
      amountEUR: calculateEURAmount(row.amountPLN, eurConversionRate),
    }));
    setRows(newRows);
  }, [eurConversionRate, rows]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setRows([
      ...rows,
      {
        id: generateRandomId(),
        title,
        amountPLN: amount,
        amountEUR: calculateEURAmount(amount, eurConversionRate),
        options: "Delete",
      },
    ]);

    setTitle("");
    setAmount(0);
  };

  const handleDeleteRow = (id: string) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  return (
    <>
      <div className="header">
        <h2>List of expenses</h2>
        <p>1EUR = {eurConversionRate} PLN</p>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="fields-wrapper">
          <div className="form-field">
            <label htmlFor="title">Title of transaction</label>
            <input
              required
              type="text"
              id="title"
              name="title"
              minLength={5}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="amount">Amount (in PLN)</label>
            <input
              required
              type="number"
              id="amount"
              name="Amount"
              step="0.01"
              pattern="\d+(\.\d{1,2})?"
              min={1}
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn">
          Add
        </button>
      </form>
      <Table rows={rows} deleteRow={handleDeleteRow} />
      <p className="sum">
        Sum: {sum} PLN ({calculateEURAmount(sum, eurConversionRate)} EUR)
      </p>
      <div>
        <p className="conversion-rate" onClick={() => setIsInputOpen(true)}>
          Do you want to insert your own conversion rate?
        </p>
        {isInputOpen && (
          <div className="conversion-rate-input">
            <input
              type="number"
              id="conversion-rate"
              name="conversion-rate"
              step="0.01"
              pattern="\d+(\.\d{1,2})?"
              min={1}
              value={eurConversionRate}
              onChange={(e) => {
                const value = +e.target.value;
                if (value > 0) {
                  setEurConversionRate(value);
                }
              }}
            />
            <button
              className="btn"
              type="submit"
              onClick={() => {
                setIsInputOpen(false);
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
