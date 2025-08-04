import { MaterialIcons } from "@expo/vector-icons";
import { TransactionCardType } from "..";
import { TransactionType } from "@/shared/enums/transactionTypes";
import { colors } from "@/shared/colors";

type IconsData = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
};

export const ICONS: Record<TransactionCardType, IconsData> = {
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
