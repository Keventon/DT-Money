import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInputProps, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "@/shared/colors";
import { useRef, useState } from "react";
import clsx from "clsx";
import { ErrorMessage } from "../ErrorMessage";

interface InputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  iconPassword?: boolean;
  label?: string;
}

export const Input = <T extends FieldValues>({
  control,
  name,
  label,
  leftIconName,
  iconPassword,
  ...rest
}: InputParams<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(iconPassword);
  const inputRef = useRef<TextInput>(null);

  function checkFocus() {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View className="w-full mt-4">
            {label && (
              <Text
                className={clsx(
                  "mb-2 mt-3 text-base",
                  isFocused ? "text-accent-brand" : "text-gray-600"
                )}
              >
                {label}
              </Text>
            )}

            <TouchableOpacity className="flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16">
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  color={isFocused ? colors["accent-brand"] : colors.gray[600]}
                  size={24}
                  className="mr-2"
                />
              )}
              <TextInput
                className="flex-1 text-base text-gray-500"
                value={value}
                onChangeText={onChange}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                secureTextEntry={showPassword}
                placeholderTextColor={colors.gray[700]}
                ref={inputRef}
                {...rest}
              />

              {iconPassword && (
                <TouchableOpacity
                  onPress={() => setShowPassword((value) => !value)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    color={colors.gray[600]}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {error && <ErrorMessage error={error.message} />}
          </View>
        );
      }}
    />
  );
};
