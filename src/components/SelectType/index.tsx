import { TransactionType } from "@/shared/enums/transactionTypes";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { colors } from "@/shared/colors";

type Props = {
  setTransactionType: (type: TransactionType) => void;
  typeId: number;
};

export function TransactionTypeSelector({ setTransactionType, typeId }: Props) {
  return (
    <View className="flex-row justify-between gap-2 mt-2">
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionType.REVENUE)}
        className={clsx(
          "flex-row items-center p-2 flex-1 justify-center h-[58] rounded-lg",
          typeId === TransactionType.REVENUE
            ? "bg-accent-brand"
            : "bg-background-tertiary"
        )}
      >
        <MaterialIcons
          className="mr-2"
          name="arrow-circle-up"
          size={30}
          color={
            typeId === TransactionType.REVENUE
              ? colors.white
              : colors["accent-brand-light"]
          }
        />
        <Text className="text-white font-bold">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setTransactionType(TransactionType.EXPENSE)}
        className={clsx(
          "flex-row items-center p-2 flex-1 justify-center h-[58] rounded-lg",
          typeId === TransactionType.EXPENSE
            ? "bg-accent-red"
            : "bg-background-tertiary"
        )}
      >
        <MaterialIcons
          name="arrow-circle-down"
          className="mr-2"
          size={30}
          color={
            typeId === TransactionType.EXPENSE
              ? colors.white
              : colors["accent-red"]
          }
        />
        <Text className="text-white font-bold">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
