import { TransactionCategory } from "@/shared/interfaces/https/TransactionCategoryResponse";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import * as transactionServices from "@/shared/service/dt-money/transactionService";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
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

  return (
    <TransactionContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
