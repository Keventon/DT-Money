import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

type Props = {
  error: string | undefined;
};

export function ErrorMessage({ error }: Props) {
  return (
    <View className="flex-row items-center mt-1">
      <MaterialIcons
        name="error-outline"
        size={16}
        color={colors["accent-red-background-primary"]}
        className="mr-1"
      />
      <Text className="text-accent-red-background-primary">{error}</Text>
    </View>
  );
}
