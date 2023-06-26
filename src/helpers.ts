import { Row } from "./types";

export const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const calculateEURAmount = (
  amountPLN: number,
  conversionRate = 4.382
) => {
  return +(amountPLN / conversionRate).toFixed(2);
};

export const calculateSum = (rows: Row[]) => {
  return rows.reduce((acc, curr) => acc + curr.amountPLN, 0);
};
