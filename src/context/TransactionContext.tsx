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
import { TotalTransactions } from "@/shared/interfaces/https/totalTransactions";
import { UpdateTransactionRequest } from "@/shared/interfaces/https/updateTransactionRequest";
import { Pagination } from "@/shared/interfaces/https/getTransactionRequest";

type FetchTransactionParams = {
  page: number;
};

type Loadings = {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
};

type HandleLoadingParams = {
  key: keyof Loadings;
  value: boolean;
};

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  fetchTransactions: (params: FetchTransactionParams) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>;
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
  refreshTransactions: () => Promise<void>;
  loadMoreTransactions: () => Promise<void>;
  loadings: Loadings;
  handleLoadings: (params: HandleLoadingParams) => void;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  async function fetchCategories() {
    const categoriesResponse =
      await transactionServices.getTransactionsCategories();
    setCategories(categoriesResponse);
  }
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    }
  );
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 4,
    totalRows: 0,
    totalPages: 0,
  });

  function handleLoadings({ key, value }: HandleLoadingParams) {
    setLoadings((prevValue) => ({ ...prevValue, [key]: value }));
  }

  async function createTransaction(transaction: CreateTransactionInterface) {
    await transactionServices.createTransaction(transaction);
    await refreshTransactions();
  }

  async function updateTransaction(transaction: UpdateTransactionRequest) {
    await transactionServices.updateTransaction(transaction);
    await refreshTransactions();
  }

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;

    const transactionResponse = await transactionServices.getTransactions({
      page: 1,
      perPage: page * perPage,
    });

    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalPages: transactionResponse.totalPages,
      totalRows: transactionResponse.totalRows,
    });
  }, [pagination]);

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionParams) => {
      const transactionResponse = await transactionServices.getTransactions({
        page,
        perPage: pagination.perPage,
      });

      if (page === 1) {
        setTransactions(transactionResponse.data);
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionResponse.data,
        ]);
      }

      setTotalTransactions(transactionResponse.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactionResponse.totalRows,
        totalPages: transactionResponse.totalPages,
      });
    },
    [pagination]
  );

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;

    fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
        updateTransaction,
        refreshTransactions,
        loadMoreTransactions,
        handleLoadings,
        loadings,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
