import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay, Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import { clearScores } from "../asyncStorage";

interface Props {
  show: boolean;
  setShow(arg);
}

const ConfirmModal: React.FC<Props> = ({ show, setShow }) => {
  return (
    <Overlay
      isVisible={show}
      height={150}
      overlayStyle={{ backgroundColor: "#E1E2E1" }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Clear High Score?</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            containerStyle={{ margin: 8, width: 90 }}
            title="Yes"
            titleStyle={{ padding: 10 }}
            raised
            icon={<Entypo name="check" size={20} color="green" />}
            onPress={() => {
              clearScores();
              setShow(false);
            }}
          />
          <Button
            containerStyle={{ margin: 8, width: 90 }}
            title="No"
            titleStyle={{ padding: 10 }}
            raised
            icon={<Entypo name="cross" size={20} color="red" />}
            onPress={() => {
              setShow(false);
            }}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    padding: 10
  }
});

export default ConfirmModal;
