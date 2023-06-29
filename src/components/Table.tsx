import "./Table.css";
import store from "../store";
import { observer } from "mobx-react";

const Table = () => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount(PLN)</th>
            <th>Amount(EUR)</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {store.rows.map(({ id, title, amountPLN, amountEUR, options }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{amountPLN}</td>
              <td>{amountEUR}</td>
              <td onClick={() => store.deleteRow(id)}>{options}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default observer(Table);
