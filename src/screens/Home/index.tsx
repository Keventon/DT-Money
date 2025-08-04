import { useAuthContext } from "@/context/AuthContext";
import { useTransactionContext } from "@/context/TransactionContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export function Home() {
  const { handleLogout } = useAuthContext();
  const { fetchCategories, fetchTransactions, transactions } =
    useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  }

  useEffect(() => {
    Promise.all([handleFetchCategories(), fetchTransactions()]);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
      />
    </SafeAreaView>
  );
}
