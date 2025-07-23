import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export interface FormLoginParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<FormLoginParams>();

  return (
    <>
      <Input
        control={control}
        name="email"
        label="E-mail"
        placeholder="mail@example.com"
        leftIconName="mail-outline"
      />
      <Input
        control={control}
        name="password"
        label="Senha"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        iconPassword
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <Button title="Login" iconName="arrow-forward" />

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <Button title="Cadastro" mode="outline" iconName="arrow-forward" />
        </View>
      </View>
    </>
  );
}
