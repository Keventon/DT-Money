import { colors } from "@/shared/colors";
import { TransactionType } from "@/shared/enums/transactionTypes";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type TransactionCardType = TransactionType | "total";

type Props = {
  type: TransactionCardType;
  amount: number;
};

type IconsData = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
};

type CardData = {
  label: string;
  bgColor: string;
};

const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionType.REVENUE]: {
    color: colors["accent-brand-light"],
    name: "arrow-circle-up",
  },
  [TransactionType.EXPENSE]: {
    color: colors["accent-red"],
    name: "arrow-circle-down",
  },
  total: {
    name: "attach-money",
    color: colors.white,
  },
};

const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionType.EXPENSE]: {
    label: "Saída",
    bgColor: "background-tertiary",
  },
  [TransactionType.REVENUE]: {
    label: "Entrada",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};

export function TransactionCard({ type, amount }: Props) {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  return (
    <View
      className={`bg-${cardData.bgColor} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`}
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
      </View>
      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}
