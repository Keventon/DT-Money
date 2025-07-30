import { Snackbar } from "@/components/Snackbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { BottomSheetProvider } from "@/context/BottomSheetContext";
import { SnackbarContextProvider } from "@/context/SnackbarContext";
import { TransactionContextProvider } from "@/context/TransactionContext";
import NavigationRoutes from "@/routes";
import { Login } from "@/screens/Login";
import "@/styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <NavigationRoutes />
              <Snackbar />
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
