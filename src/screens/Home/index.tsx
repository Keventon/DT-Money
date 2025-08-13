import { useAuthContext } from "@/context/AuthContext";
import { useTransactionContext } from "@/context/TransactionContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { EmptyList } from "./EmptyList";
import { colors } from "@/shared/colors";

export function Home() {
  const { handleLogout } = useAuthContext();
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadMoreTransactions,
    handleLoadings,
    loadings,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      handleLoadings({
        key: "initial",
        value: true,
      });
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    } finally {
      handleLoadings({
        key: "initial",
        value: false,
      });
    }
  }

  async function handleFetchInitialTransactions() {
    try {
      handleLoadings({
        key: "initial",
        value: true,
      });
      await fetchTransactions({
        page: 1,
      });
    } catch (error) {
      handleError(error, "Falha ao buscar transações");
    } finally {
      handleLoadings({
        key: "initial",
        value: false,
      });
    }
  }

  async function handleMoreTransactions() {
    try {
      handleLoadings({
        key: "loadMore",
        value: true,
      });

      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao carregar as transações");
    } finally {
      handleLoadings({
        key: "loadMore",
        value: false,
      });
    }
  }

  async function handleRefreshTransactions() {
    try {
      handleLoadings({
        key: "refresh",
        value: true,
      });

      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao recarregar transações");
    } finally {
      handleLoadings({
        key: "refresh",
        value: false,
      });
    }
  }

  useEffect(() => {
    Promise.all([handleFetchCategories(), handleFetchInitialTransactions()]);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        showsVerticalScrollIndicator={false}
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        ListHeaderComponent={ListHeader}
        onEndReached={handleMoreTransactions}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={loadings.initial ? null : EmptyList}
        ListFooterComponent={
          loadings.loadMore ? (
            <ActivityIndicator
              size={"large"}
              color={colors["accent-brand-light"]}
            />
          ) : null
        }
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
}
