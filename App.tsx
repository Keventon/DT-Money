import { Snackbar } from "@/components/Snackbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { SnackbarContextProvider } from "@/context/SnackbarContext";
import NavigationRoutes from "@/routes";
import { Login } from "@/screens/Login";
import "@/styles/global.css";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />
        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
