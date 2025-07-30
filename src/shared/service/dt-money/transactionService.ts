import { TransactionCategory } from "@/shared/interfaces/https/TransactionCategoryResponse";
import { api } from "../api";

export async function getTransactionsCategories(): Promise<
  TransactionCategory[]
> {
  const { data } = await api.get<TransactionCategory[]>(
    "/transaction/categories"
  );

  return data;
}
