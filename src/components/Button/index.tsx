import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { colors } from "@/shared/colors";

type ButtonMode = "fill" | "outline";
interface Props extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  mode?: ButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export function Button({
  title,
  mode = "fill",
  iconName,
  isLoading = false,
  ...rest
}: Props) {
  const isFill = mode === "fill";

  return (
    <TouchableOpacity
      className={clsx(
        "w-full rounded-xl px-5 flex-row items-center h-button",
        iconName ? "justify-between" : "justify-center",
        {
          "bg-accent-brand": isFill,
          "bg-none border-[1px] border-accent-brand": !isFill,
        }
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text
          className={clsx("text-base", {
            "text-white": isFill,
            "text-accent-brand": !isFill,
          })}
        >
          {title}
        </Text>
      )}

      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isFill ? colors.white : colors["accent-brand"]}
        />
      )}
    </TouchableOpacity>
  );
}
