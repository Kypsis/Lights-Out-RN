import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import GameButton from "../components/GameButton";

import { clearScores } from "../utilities/asyncStorage";

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
          <GameButton
            title="Yes"
            iconName="check"
            iconColor="darkgreen"
            width={90}
            callback={() => {
              clearScores();
              setShow(false);
            }}
          />
          <GameButton
            title="No"
            iconName="close"
            iconColor="red"
            width={90}
            callback={() => setShow(false)}
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
    fontSize: 25,
    padding: 10
  }
});

export default ConfirmModal;
