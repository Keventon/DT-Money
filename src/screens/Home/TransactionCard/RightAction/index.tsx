import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import * as transactionService from "@/shared/service/dt-money/transactionService";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/SnackbarContext";

type Props = {
  transactionId: number;
};

export function RightAction({ transactionId }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  async function handleDelete() {
    try {
      setLoading(true);
      await transactionService.deleteTransaction(transactionId);
      hideModal();
      notify({ message: "Transação apagada", messageType: "SUCESS" });
    } catch (error) {
      handleError(error, "Falha ao deletar a transação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
      >
        <MaterialIcons name="delete-outline" size={30} color={colors.white} />
      </TouchableOpacity>

      <DeleteModal
        visible={modalVisible}
        hideModal={hideModal}
        handleDeleteTransaction={handleDelete}
        loading={loading}
      />
    </>
  );
}
