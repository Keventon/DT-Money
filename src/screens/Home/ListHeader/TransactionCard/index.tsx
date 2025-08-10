import { colors } from "@/shared/colors";
import { TransactionType } from "@/shared/enums/transactionTypes";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactionContext } from "@/context/TransactionContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ICONS } from "./strategies/iconDataStrategy";
import { CARD_DATA } from "./strategies/cardDataStrategy";
import { moneyMapper } from "@/utils/moneyMapper";
import clsx from "clsx";

export type TransactionCardType = TransactionType | "total";

type Props = {
  type: TransactionCardType;
  amount: number;
};

export function TransactionCard({ type, amount }: Props) {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

  return (
    <View
      className={clsx(
        `bg-${cardData.bgColor} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`,
        type === "total" && "mr-12"
      )}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
      </View>

      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {moneyMapper(amount)}
        </Text>
        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction.createdAt,
                  `'Última ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
                  { locale: ptBR }
                )
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
}
