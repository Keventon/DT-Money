import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

export function RightAction() {
  const [modalVisible, setModalVisible] = useState(false);

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
      >
        <MaterialIcons name="delete-outline" size={30} color={colors.white} />
      </TouchableOpacity>

      <DeleteModal visible={modalVisible} hideModal={hideModal} />
    </>
  );
}
