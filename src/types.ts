type Options = "Delete";

export interface Row {
  id: string;
  title: string;
  amountPLN: number;
  amountEUR: number;
  options: Options;
}
