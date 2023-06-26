import "./Table.css";
import { Row } from "../types";

interface TableProps {
  rows: Row[];
  deleteRow: (idx: string) => void;
}

const Table = ({ rows, deleteRow }: TableProps) => {
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
          {rows.map(({ id, title, amountPLN, amountEUR, options }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{amountPLN}</td>
              <td>{amountEUR}</td>
              <td onClick={() => deleteRow(id)}>{options}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
