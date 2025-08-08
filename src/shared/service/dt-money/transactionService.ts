import { TransactionCategory } from "@/shared/interfaces/https/TransactionCategoryResponse";
import { api } from "../api";
import { CreateTransactionInterface } from "@/shared/interfaces/https/createTransaction";
import {
  TransactionRequest,
  TransactionResponse,
} from "@/shared/interfaces/https/getTransactionRequest";
import qs from "qs";

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

export async function deleteTransaction(id: number) {
  await api.delete(`/transaction/${id}`);
}

export async function getTransactions(
  params: TransactionRequest
): Promise<TransactionResponse> {
  const { data } = await api.get<TransactionResponse>("/transaction", {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
  });

  return data;
}
