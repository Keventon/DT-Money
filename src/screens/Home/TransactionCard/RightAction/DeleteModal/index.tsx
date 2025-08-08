import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

type Props = {
  visible: boolean;
  hideModal: () => void;
  handleDeleteTransaction: () => void;
  loading: boolean;
};

export function DeleteModal({
  visible,
  hideModal,
  handleDeleteTransaction,
  loading,
}: Props) {
  return (
    <View className="flex-1 absolute">
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback
              onPress={(event) => event.stopPropagation()}
            >
              <View className="m-2 bg-background-secondary rounded-[16] p-8 items-center shadow-lg w-[90%] h-[322] z-2">
                <View className="w-full flex-row items-center justify-between border-b border-gray-300 pb-6">
                  <View className="flex-row items-center gap-6">
                    <MaterialIcons
                      name="error-outline"
                      className="m-4"
                      size={25}
                      color={colors.gray[400]}
                    />
                    <Text className="text-white text-xl">
                      Apagar transação?
                    </Text>
                  </View>
                  <TouchableOpacity onPress={hideModal}>
                    <MaterialIcons
                      name="close"
                      size={25}
                      color={colors.gray[800]}
                    />
                  </TouchableOpacity>
                </View>

                <View className="p-3 flex-1 border-b border-gray-300 items-center justify-center">
                  <Text className="text-gray-500 text-lg leading-8">
                    Tem certeza que deseja apagar esta transação? Esta ação não
                    será desfeita
                  </Text>
                </View>

                <View className="flex-row justify-end gap-4 w-full p-6 pb-0 pr-0">
                  <TouchableOpacity
                    onPress={hideModal}
                    className="w-[100] bg-none border-2 border-accent-brand items-center justify-center p-3 rounded-[6]"
                  >
                    <Text className="text-accent-brand">Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteTransaction}
                    className="w-[100] bg-none bg-accent-red-background-primary items-center justify-center p-3 rounded-[6]"
                  >
                    <Text className="text-white">
                      {loading ? (
                        <ActivityIndicator color={colors.white} />
                      ) : (
                        "Apagar"
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
