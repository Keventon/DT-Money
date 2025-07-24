import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { Text, View } from "react-native";
import { RegisterForm } from "./RegisterForm";
import { Header } from "@/components/Header";

export function Register() {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <Header />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
}
