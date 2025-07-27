import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { schema } from "./schema";
import { useAuthContext } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { useSnackbarContext } from "@/context/SnackbarContext";
import { AppError } from "@/shared/helpers/AppError";
import { useErrorHandler } from "@/hooks/useErrorHandler";

export interface FormLoginParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleAuthenticate } = useAuthContext();
  const { handleError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  async function onSubmit(userData: FormLoginParams) {
    try {
      await handleAuthenticate(userData);
    } catch (error) {
      handleError(error, "Falha ao logar");
    }
  }

  return (
    <>
      <Input
        control={control}
        name="email"
        label="E-mail"
        placeholder="mail@example.com"
        leftIconName="mail-outline"
        autoCapitalize="none"
        inputMode="email"
      />
      <Input
        control={control}
        name="password"
        label="Senha"
        leftIconName="lock-outline"
        iconPassword
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <Button
          title="Login"
          iconName="arrow-forward"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
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
