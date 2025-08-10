import { CreateTransactionInterface } from "@/shared/interfaces/https/createTransaction";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/BottomSheetContext";
import * as yup from "yup";
import { useTransactionContext } from "@/context/TransactionContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/SnackbarContext";
import { ErrorMessage } from "@/components/ErrorMessage";
import CurrencyInput from "react-native-currency-input";
import { SelectCategoryModal } from "@/components/SelectCategoryModal";
import { TransactionTypeSelector } from "@/components/SelectType";
import { Button } from "@/components/Button";
import { transactionSchema } from "./schema";
import { Transaction } from "@/shared/interfaces/transaction";
import { UpdateTransactionRequest } from "@/shared/interfaces/https/updateTransactionRequest";

type ValidationErrosTypes = Record<keyof UpdateTransactionRequest, string>;

type Props = {
  transaction: Transaction;
};

export function EditTransactionForm({ transaction: transactionUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<UpdateTransactionRequest>({
    categoryId: transactionUpdate.categoryId,
    description: transactionUpdate.description,
    id: transactionUpdate.id,
    typeId: transactionUpdate.typeId,
    value: transactionUpdate.value,
  });
  const [validationErros, setValidationErros] =
    useState<ValidationErrosTypes>();

  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  async function handleUpdateTransaction() {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });
      await updateTransaction(transaction);
      notify({
        message: "Transação atualizada com sucesso",
        messageType: "SUCESS",
      });
      closeBottomSheet();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {} as ValidationErrosTypes;

        error.inner.forEach((error) => {
          if (error.path) {
            errors[error.path as keyof CreateTransactionInterface] =
              error.message;
          }
        });

        setValidationErros(errors);
      } else {
        handleError(error, "Falha ao atualizar transação");
      }
    } finally {
      setLoading(false);
    }
  }

  function setTransactionType(
    key: keyof CreateTransactionInterface,
    value: string | number
  ) {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  }

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">Nova Transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          onChangeText={(text) => setTransactionType("description", text)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
        />

        {validationErros?.description && (
          <ErrorMessage error={validationErros.description} />
        )}

        <CurrencyInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionType("value", value ?? 0)}
        />
        {validationErros?.value && (
          <ErrorMessage error={validationErros.value} />
        )}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionType("categoryId", categoryId)
          }
        />

        {validationErros?.categoryId && (
          <ErrorMessage error={validationErros.categoryId} />
        )}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionType("typeId", typeId)}
        />

        {validationErros?.typeId && (
          <ErrorMessage error={validationErros.typeId} />
        )}

        <View className="my-4">
          <Button
            title="Atualizar"
            onPress={handleUpdateTransaction}
            isLoading={loading}
          />
        </View>
      </View>
    </View>
  );
}
