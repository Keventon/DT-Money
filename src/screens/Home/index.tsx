import { AppHeader } from "@/components/AppHeader";
import { useAuthContext } from "@/context/AuthContext";
import { useTransactionContext } from "@/context/TransactionContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  const { handleLogout } = useAuthContext();
  const { fetchCategories } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  }

  useEffect(() => {
    handleFetchCategories();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
      <Text>Tela Home</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
