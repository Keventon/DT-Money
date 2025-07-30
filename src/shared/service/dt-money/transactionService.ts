import { TransactionCategory } from "@/shared/interfaces/https/TransactionCategoryResponse";
import { api } from "../api";
import { CreateTransactionInterface } from "@/shared/interfaces/https/createTransaction";

export async function getTransactionsCategories(): Promise<
  TransactionCategory[]
> {
  const { data } = await api.get<TransactionCategory[]>(
    "/transaction/categories"
  );

  return data;
}

export async function createTransaction(
  transaction: CreateTransactionInterface
) {
  await api.post("/transaction", transaction);
}
