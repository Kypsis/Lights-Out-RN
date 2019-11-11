import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import GameButton from "../components/GameButton";

import { clearScores } from "../utilities/asyncStorage";

interface Props {
  show: boolean;
  setShow(arg: boolean): void;
}

const ConfirmModal: React.FC<Props> = ({ show, setShow }) => {
  return (
    <Overlay
      isVisible={show}
      height={150}
      overlayStyle={{ backgroundColor: "#1D1F33" }}
      windowBackgroundColor={"rgba(0, 0, 0, .9)"}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Clear High Score?</Text>
        <View style={{ flexDirection: "row" }}>
          <GameButton
            title="Yes"
            iconName="check"
            iconColor="#327738"
            width={90}
            callback={() => {
              clearScores();
              setShow(false);
            }}
          />
          <GameButton
            title="No"
            iconName="close"
            iconColor="#8214A0"
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
    padding: 10,
    color: "white"
  }
});

export default ConfirmModal;
