import { TransactionCategory } from "@/shared/interfaces/https/TransactionCategoryResponse";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import * as transactionServices from "@/shared/service/dt-money/transactionService";
import { CreateTransactionInterface } from "@/shared/interfaces/https/createTransaction";
import { Transaction } from "@/shared/interfaces/transaction";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  fetchTransactions: () => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  async function fetchCategories() {
    const categoriesResponse =
      await transactionServices.getTransactionsCategories();
    setCategories(categoriesResponse);
  }

  async function createTransaction(transaction: CreateTransactionInterface) {
    await transactionServices.createTransaction(transaction);
  }

  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await transactionServices.getTransactions({
      page: 1,
      perPage: 10,
    });
    console.log(transactionResponse);

    setTransactions(transactionResponse.data);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
