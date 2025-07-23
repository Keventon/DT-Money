import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { useCallback, useState } from "react";
import { SystemBars } from "react-native-edge-to-edge";

function NavigationRoutes() {
  const [user, setUser] = useState(undefined);
  const Routes = useCallback(() => {
    if (!user) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user]);

  return (
    <NavigationContainer>
      <SystemBars style={"light"} />
      <Routes />
    </NavigationContainer>
  );
}

export default NavigationRoutes;
