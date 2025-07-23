import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { View } from "react-native";
import { LoginForm } from "./LoginForm";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";

export function Login() {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <Header />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
}
