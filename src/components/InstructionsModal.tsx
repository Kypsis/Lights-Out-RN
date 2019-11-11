import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import GameButton from "../components/GameButton";

interface Props {
  showInstructions: boolean;
  setShowInstructions(arg: boolean);
}

const InstructionsModal: React.FC<Props> = ({
  showInstructions,
  setShowInstructions
}) => {
  return (
    <Overlay
      height={320}
      isVisible={showInstructions}
      overlayStyle={{ backgroundColor: "#1D1F33" }}
      windowBackgroundColor={"rgba(0, 0, 0, .9)"}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>How to play?</Text>
        <Text style={styles.text}>
          Lights On is a puzzle game consisting of a grid of lights that are
          either on or off. Pressing any light will toggle it and its adjacent
          lights. The goal of the game is to switch all the lights on.
        </Text>
        <GameButton
          title="Got it!"
          iconColor="#327738"
          iconName="thumb-up-outline"
          callback={() => setShowInstructions(false)}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  heading: {
    color: "white",
    fontFamily: "orbitron-medium",
    fontSize: 25,
    padding: 10
  },
  text: {
    color: "white",
    fontSize: 18,
    padding: 10
  }
});

export default InstructionsModal;
