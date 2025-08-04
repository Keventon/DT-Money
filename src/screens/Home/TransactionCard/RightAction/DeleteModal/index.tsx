import {
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
};

export function DeleteModal({ visible, hideModal }: Props) {
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
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
