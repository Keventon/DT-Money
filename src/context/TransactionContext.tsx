import { TransactionCategory } from "@/shared/interfaces/https/TransactionCategoryResponse";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import * as transactionServices from "@/shared/service/dt-money/transactionService";
import { CreateTransactionInterface } from "@/shared/interfaces/https/createTransaction";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);

  async function fetchCategories() {
    const categoriesResponse =
      await transactionServices.getTransactionsCategories();
    setCategories(categoriesResponse);
  }

  async function createTransaction(transaction: CreateTransactionInterface) {
    await transactionServices.createTransaction(transaction);
  }

  return (
    <TransactionContext.Provider
      value={{ categories, fetchCategories, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
