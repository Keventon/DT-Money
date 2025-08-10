export type UpdateTransactionRequest = {
  id: number;
  description: string;
  typeId: number;
  categoryId: number;
  value: number;
};
