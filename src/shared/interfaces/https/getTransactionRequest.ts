import { Transaction } from "../transaction";
import { TotalTransactions } from "./totalTransactions";

export type Pagination = {
  page: number;
  perPage: number;
  totalRows?: number;
  totalPages: number;
};

export type TransactionRequest = {
  page: number;
  perPage: number;
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryId?: number;
  searchText?: string;
};

export type TransactionResponse = {
  data: Transaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: TotalTransactions;
};
