import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { useCallback, useState } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import { useAuthContext } from "@/context/AuthContext";
import { Loading } from "@/screens/Loading";

function NavigationRoutes() {
  const { token, user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const Routes = useCallback(() => {
    if (loading) {
      return <Loading setLoading={setLoading} />;
    }

    if (!user || !token) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user, token, loading]);

  return (
    <NavigationContainer>
      <SystemBars style={"light"} />
      <Routes />
    </NavigationContainer>
  );
}

export default NavigationRoutes;
