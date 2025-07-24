import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { schema } from "./schema";

export interface FormLoginParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  async function onSubmit() {}

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
        <Button
          title="Login"
          iconName="arrow-forward"
          onPress={handleSubmit(onSubmit)}
        />

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <Button
            title="Cadastro"
            mode="outline"
            iconName="arrow-forward"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </>
  );
}
