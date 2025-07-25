import { useAuthContext } from "@/context/AuthContext";
import { Text, TouchableOpacity, View } from "react-native";

export function Home() {
  const { handleLogout } = useAuthContext();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Tela Home</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
