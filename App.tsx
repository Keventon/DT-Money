import { AuthContextProvider } from "@/context/AuthContext";
import NavigationRoutes from "@/routes";
import { Login } from "@/screens/Login";
import "@/styles/global.css";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  );
}
