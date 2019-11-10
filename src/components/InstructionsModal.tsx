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
      isVisible={showInstructions}
      height={320}
      overlayStyle={{ backgroundColor: "#E1E2E1" }}
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
          iconName="thumb-up-outline"
          iconColor="darkslategray"
          callback={() => setShowInstructions(false)}
        />
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
  heading: {
    fontFamily: "orbitron-medium",
    fontSize: 25,
    padding: 10
  },
  text: {
    fontSize: 18,
    padding: 10
  }
});

export default InstructionsModal;