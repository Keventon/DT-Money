import { Pressable, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction } from "@/shared/interfaces/transaction";
import { useBottomSheetContext } from "@/context/BottomSheetContext";
import { EditTransactionForm } from "./EditTransactionForm";
import { colors } from "@/shared/colors";
import { NewTransaction } from "@/components/NewTransaction";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  transaction: Transaction;
};

export function LeftAction({ transaction }: Props) {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <RectButton
      style={{
        height: 140,
        backgroundColor: colors["accent-blue"],
        width: 80,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        openBottomSheet(<EditTransactionForm transaction={transaction} />, 1);
      }}
    >
      <MaterialIcons name="edit" size={30} color={colors.white} />
    </RectButton>
  );
}
