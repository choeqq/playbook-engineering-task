import { makeAutoObservable } from "mobx";
import { generateRandomId } from "./helpers";
import type { Row } from "./types";

const deleteRow = (rows: Row[], id: string) =>
  rows.filter((row) => row.id !== id);

const addRow = (rows: Row[], row: Row): Row[] => [
  ...rows,
  {
    id: generateRandomId(),
    title: row.title,
    amountPLN: row.amountPLN,
    amountEUR: row.amountEUR,
    options: "Delete",
  },
];

const updateEURAmountRows = (rows: Row[], conversionRate = 4.382): Row[] => {
  const newRows = rows.map((row) => ({
    ...row,
    amountEUR: +(row.amountPLN / conversionRate).toFixed(2),
  }));
  return newRows;
};

class Store {
  rows: Row[] = [
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
  ];
  newRow: Row = {
    id: "",
    title: "",
    amountPLN: 0,
    amountEUR: 0,
    options: "Delete",
  };
  sum = 0;
  eurConversionRate = 4.382;

  constructor() {
    makeAutoObservable(this);
  }

  addRow(row: Row) {
    this.rows = addRow(this.rows, row);
    this.calculateSum();
    this.newRow = {
      id: "",
      title: "",
      amountPLN: 0,
      amountEUR: 0,
      options: "Delete",
    };
  }

  deleteRow(id: string) {
    this.rows = deleteRow(this.rows, id);
    this.calculateSum();
  }

  calculateSum() {
    this.sum = this.rows.reduce((acc, curr) => acc + curr.amountPLN, 0);
    return this.sum;
  }

  updateConversionRate(conversionRate: number) {
    this.eurConversionRate = conversionRate;
    this.updateEURAmount(conversionRate);
  }

  updateEURAmount(conversionRate = 4.382) {
    this.rows = updateEURAmountRows(this.rows, conversionRate);
    this.calcuateEURSum();
  }

  calcuateEURSum() {
    return this.rows.reduce((acc, curr) => acc + curr.amountEUR, 0).toFixed(2);
  }
}

const store = new Store();
export default store;
