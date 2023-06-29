import { useState } from "react";
import "./App.css";
import { generateRandomId } from "./helpers";
import Table from "./components/Table";
import store from "./store";
import { observer } from "mobx-react";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(1);
  const [isInputOpen, setIsInputOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    store.addRow({
      id: generateRandomId(),
      title,
      amountPLN: amount,
      amountEUR: +(amount / store.eurConversionRate).toFixed(2),
      options: "Delete",
    });

    setTitle("");
    setAmount(0);
  };

  return (
    <>
      <div className="header">
        <h2>List of expenses</h2>
        <p>1EUR = {store.eurConversionRate} PLN</p>
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
      <Table />
      <p className="sum">
        Sum: {store.calculateSum()} PLN ({store.calcuateEURSum()} EUR)
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
              value={store.eurConversionRate}
              onChange={(e) => {
                const value = +e.target.value;
                if (value > 0) {
                  store.updateConversionRate(value);
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

export default observer(App);
